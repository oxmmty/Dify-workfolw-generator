'use server';

import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';

export async function createUser() {
	const { userId } = await auth();

	if (!userId) {
		console.error('User authentication failed: userId is null');
		throw new Error('User not authenticated');
	}

	try {
		const existingUser = await db.user.findUnique({
			where: { clerkId: userId },
		});

		if (existingUser) {
			console.log(`User with clerkId ${userId} already exists`);
			return existingUser;
		}

		const newUser = await db.user.create({
			data: {
				clerkId: userId,
			},
		});

		console.log(`New user created with clerkId ${userId}`);
		return newUser;
	} catch (error) {
		console.error('Error in createUser:', error);
		if (error instanceof Error) {
			console.error('Error message:', error.message);
			console.error('Error stack:', error.stack);
		}
		throw error;
	} finally {
		await db.$disconnect();
	}
}
