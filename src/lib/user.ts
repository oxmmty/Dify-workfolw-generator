import { db } from './db';
import { auth } from '@clerk/nextjs/server';

export const fetchUserByClerkId = async (clerkId: string | null) => {
	if (!clerkId) {
		throw new Error('Clerk ID is required.');
	}

	try {
		const user = await db.user.findUnique({
			where: { clerkId },
		});

		if (!user) {
			throw new Error('User not found.');
		}

		return user;
	} catch (error) {
		console.error('Error fetching user by Clerk ID:', error);
		throw error;
	}
};

export async function getUserData() {
	const { userId } = await auth();

	if (!userId) {
		throw new Error('User not authenticated');
	}

	const user = await fetchUserByClerkId(userId);

	if (!user) {
		throw new Error('User not found in database');
	}

	const used = user.usageCount;
	const limit = user.usageLimit;
	const percentage = (used / limit) * 100;

	return {
		user,
		used,
		limit,
		percentage,
	};
}

