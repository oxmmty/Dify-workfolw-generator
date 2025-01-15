import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';

export async function getManuscripts() {
	const { userId } = await auth();

	if (!userId) {
		throw new Error('Unauthorized');
	}

	try {
		// First get the user from your database
		const user = await db.user.findFirst({
			where: {
				clerkId: userId,
			},
		});

		if (!user) {
			throw new Error('User not found');
		}

		const manuscripts = await db.manuscript.findMany({
			where: {
				userId: user.id,
			},
			orderBy: {
				createdAt: 'desc',
			},
		});

		return manuscripts;
	} catch (error) {
		console.error('Error fetching manuscripts:', error);
		throw new Error('Failed to fetch manuscripts');
	}
}
