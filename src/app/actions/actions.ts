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

export async function runWorkflow(fileId: string, user: string) {
	try {
		const response = await fetch(`${API_URL}/workflows/run`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${API_KEY}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				inputs: {
					file: {
						transfer_method: 'local_file',
						upload_file_id: fileId,
						type: 'document',
					},
				},
				response_mode: 'blocking',
				user: user,
			}),
		});

		if (!response.ok) {
			const errorData = await response.json();
			console.error('Workflow execution failed:', errorData);

			if (
				errorData.code === 'invalid_param' &&
				errorData.message === 'Workflow not published'
			) {
				throw new Error(
					'The workflow is not published. Please publish the workflow in your Dify account.'
				);
			} else {
				throw new Error(
					`Workflow execution failed: ${
						errorData.message || response.statusText
					}`
				);
			}
		}

		return response.json();
	} catch (error) {
		console.error('Error in runWorkflow:', error);
		throw error;
	}
}

export async function getWorkflowRunDetail(workflowId: string) {
	try {
		const response = await fetch(`${API_URL}/workflows/run/${workflowId}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${API_KEY}`,
			},
		});

		if (!response.ok) {
			const errorData = await response.json();
			console.error('Failed to get workflow run detail:', errorData);
			throw new Error(
				`Failed to get workflow run detail: ${response.status} ${response.statusText}`
			);
		}

		return response.json();
	} catch (error) {
		console.error('Error in getWorkflowRunDetail:', error);
		throw error;
	}
}

export async function createManuscriptAndUpdateUsage(
	title: string,
	content: string
) {
	const { userId } = await auth();

	if (!userId) {
		console.error('User not authenticated');
		throw new Error('User not authenticated');
	}

	console.log('Authenticated user ID:', userId);

	try {
		const userData = await getUserData();
		console.log('User data:', userData);

		if (!userData) {
			console.error('User data is null');
			throw new Error('Failed to fetch user data');
		}

		if (userData.used >= userData.limit) {
			console.error('Usage limit reached');
			throw new Error('Usage limit reached');
		}

		if (!title.trim() || !content.trim()) {
			console.error('Empty title or content', { title, content });
			throw new Error('Title and content cannot be empty');
		}

		const updatedUser = await db.user.update({
			where: { clerkId: userId },
			data: {
				usageCount: { increment: 1 },
				manuscripts: {
					create: {
						title: title.trim(),
						content: content.trim(),
					},
				},
			},
			include: {
				manuscripts: true,
			},
		});

		console.log('Manuscript created and usage updated for user', userId);
		return updatedUser;
	} catch (error) {
		console.error('Error in createManuscriptAndUpdateUsage:', error);
		throw error;
	} finally {
		await db.$disconnect();
	}
}
