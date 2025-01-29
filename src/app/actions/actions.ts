'use server';

import { db } from '@/lib/db';
import { getUserData } from '@/lib/user';
import { auth } from '@clerk/nextjs/server';

const API_KEY = process.env.DIFY_API_KEY;
const API_URL = process.env.DIFY_API_URL;

export async function checkUsageLimit() {
	const { userId } = await auth();

	if (!userId) {
		throw new Error('User not authenticated');
	}

	try {
		const userData = await getUserData();

		if (!userData) {
			throw new Error('Failed to fetch user data');
		}

		return {
			canGenerate: userData.used < userData.limit,
			used: userData.used,
			limit: userData.limit,
		};
	} catch (error) {
		console.error('Error in checkUsageLimit:', error);
		throw error;
	}
}

export async function uploadFile(formData: FormData) {
	try {
		const response = await fetch(`${API_URL}/files/upload`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${API_KEY}`,
			},
			body: formData,
		});

		if (!response.ok) {
			const errorData = await response.json();
			console.error('File upload failed:', errorData);
			throw new Error(
				`File upload failed: ${response.status} ${response.statusText}`
			);
		}

		return response.json();
	} catch (error) {
		console.error('Error in uploadFile:', error);
		throw error;
	}
}

export async function updateUsage() {
	const { userId } = await auth();

	if (!userId) {
		throw new Error('User not authenticated');
	}

	try {
		const userData = await getUserData();

		if (!userData) {
			throw new Error('Failed to fetch user data');
		}

		if (userData.used >= userData.limit) {
			throw new Error('Usage limit reached');
		}

		await db.user.update({
			where: { clerkId: userId },
			data: {
				usageCount: { increment: 1 },
			},
		});
	} catch (error) {
		console.error(error);
		throw error;
	} finally {
		await db.$disconnect();
	}
}
