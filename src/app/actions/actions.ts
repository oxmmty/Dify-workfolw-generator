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

// export async function runWorkflow(fileId: string, user: string) {
// 	if (!API_URL || !API_KEY) {
// 		throw new Error(
// 			'API configuration is missing. Please check your environment variables.'
// 		);
// 	}

// 	try {
// 		console.log('Running workflow with URL:', `${API_URL}/workflows/run`);

// 		const response = await fetch(`${API_URL}/workflows/run`, {
// 			method: 'POST',
// 			headers: {
// 				Authorization: `Bearer ${API_KEY}`,
// 				'Content-Type': 'application/json',
// 				Accept: 'application/json',
// 			},
// 			body: JSON.stringify({
// 				inputs: {
// 					knowledge: {
// 						transfer_method: 'local_file',
// 						upload_file_id: fileId,
// 						type: 'document',
// 					},
// 				},
// 				response_mode: 'blocking',
// 				user: user,
// 			}),
// 		});

// 		// Log response details for debugging
// 		console.log('Response status:', response.status);
// 		console.log(
// 			'Response headers:',
// 			Object.fromEntries(response.headers.entries())
// 		);

// 		if (!response.ok) {
// 			let errorMessage;
// 			const contentType = response.headers.get('content-type');

// 			if (contentType && contentType.includes('application/json')) {
// 				try {
// 					const errorData = await response.json();
// 					errorMessage = errorData.message || response.statusText;

// 					if (
// 						errorData.code === 'invalid_param' &&
// 						errorData.message === 'Workflow not published'
// 					) {
// 						throw new Error(
// 							'The workflow is not published. Please publish the workflow in your Dify account.'
// 						);
// 					}
// 				} catch (parseError) {
// 					console.error('Error parsing JSON response:', parseError);
// 					errorMessage = `Failed to parse error response: ${response.statusText}`;
// 				}
// 			} else {
// 				try {
// 					const textContent = await response.text();
// 					console.error('Non-JSON error response:', textContent);
// 					errorMessage = `Server returned ${response.status}: ${response.statusText}`;
// 				} catch (textError) {
// 					errorMessage = `HTTP ${response.status}: ${response.statusText}`;
// 				}
// 			}

// 			throw new Error(`Workflow execution failed: ${errorMessage}`);
// 		}

// 		const result = await response.json();
// 		console.log('Workflow execution successful:', result);
// 		console.log('Full API response:', JSON.stringify(result, null, 2));
// 		return result;
// 	} catch (error) {
// 		console.error('Error in runWorkflow:', error);
// 		throw error;
// 	}
// }

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

// export async function createManuscriptAndUpdateUsage(
// 	title: string,
// 	content: string
// ) {
// 	const { userId } = await auth();

// 	if (!userId) {
// 		console.error('User not authenticated');
// 		throw new Error('User not authenticated');
// 	}

// 	console.log('Authenticated user ID:', userId);

// 	try {
// 		const userData = await getUserData();
// 		console.log('User data:', userData);

// 		if (!userData) {
// 			console.error('User data is null');
// 			throw new Error('Failed to fetch user data');
// 		}

// 		if (userData.used >= userData.limit) {
// 			console.error('Usage limit reached');
// 			throw new Error('Usage limit reached');
// 		}

// 		if (!title.trim() || !content.trim()) {
// 			console.error('Empty title or content', { title, content });
// 			throw new Error('Title and content cannot be empty');
// 		}

// 		const updatedUser = await db.user.update({
// 			where: { clerkId: userId },
// 			data: {
// 				usageCount: { increment: 1 },
// 				manuscripts: {
// 					create: {
// 						title: title.trim(),
// 						content: content.trim(),
// 					},
// 				},
// 			},
// 			include: {
// 				manuscripts: true,
// 			},
// 		});

// 		console.log('Manuscript created and usage updated for user', userId);
// 		return updatedUser;
// 	} catch (error) {
// 		console.error('Error in createManuscriptAndUpdateUsage:', error);
// 		throw error;
// 	} finally {
// 		await db.$disconnect();
// 	}
// }


export async function runWorkflow(
	fileId: string,
	user: string
): Promise<string> {
	if (!API_URL || !API_KEY) {
		throw new Error(
			'API configuration is missing. Please check your environment variables.'
		);
	}

	try {
		const response = await fetch(`${API_URL}/workflows/run`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${API_KEY}`,
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify({
				inputs: {
					knowledge: {
						transfer_method: 'local_file',
						upload_file_id: fileId,
						type: 'document',
					},
				},
				response_mode: 'streaming',
				user: user,
			}),
		});

		if (!response.ok) {
			throw new Error(`Workflow execution failed: ${response.statusText}`);
		}

		const reader = response.body?.getReader();
		if (!reader) {
			throw new Error('Failed to get response reader');
		}

		let result = '';
		let buffer = '';

		while (true) {
			const { done, value } = await reader.read();
			if (done) break;

			const chunk = new TextDecoder().decode(value);
			buffer += chunk;

			let newlineIndex;
			while ((newlineIndex = buffer.indexOf('\n')) !== -1) {
				const line = buffer.slice(0, newlineIndex);
				buffer = buffer.slice(newlineIndex + 1);

				if (line.startsWith('data: ')) {
					try {
						const jsonStr = line.slice(6);
						// Handle potential incomplete JSON
						const lastBraceIndex = jsonStr.lastIndexOf('}');
						if (lastBraceIndex !== -1) {
							const data = JSON.parse(jsonStr.slice(0, lastBraceIndex + 1));
							if (
								data.event === 'node_finished' &&
								data.data.node_type === 'llm'
							) {
								result += data.data.outputs.text || '';
							}
						}
					} catch (error) {
						console.error('Error parsing JSON:', error);
						// Continue processing other lines
					}
				}
			}
		}

		return result.trim();
	} catch (error) {
		console.error('Error in runWorkflow:', error);
		throw error;
	}
}

export async function createManuscriptAndUpdateUsage(
	title: string,
	content: string
) {
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

		return updatedUser;
	} catch (error) {
		console.error('Error in createManuscriptAndUpdateUsage:', error);
		throw error;
	} finally {
		await db.$disconnect();
	}
}

