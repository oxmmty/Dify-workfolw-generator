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

export async function runWorkflow(
	fileId: string,
	user: string
): Promise<ReadableStream<Uint8Array>> {
	if (!API_URL || !API_KEY) {
		throw new Error(
			'API configuration is missing. Please check your environment variables.'
		);
	}

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
	await updateUsage();

	// Define section order
	const sectionOrder = [
		'Introduction',
		...Array.from({ length: 4 }, (_, chapterIndex) => [
			`Chapter ${chapterIndex + 1}`,
			...Array.from(
				{ length: 3 },
				(_, sectionIndex) => `${chapterIndex + 1}.${sectionIndex + 1}`
			),
		]).flat(),
		'Conclusion',
	];

	return new ReadableStream({
		async start(controller) {
			const reader = response.body?.getReader();

			if (!reader) {
				controller.close();
				return;
			}

			let buffer = '';
			let chunkCount = 0;
			const chunks: { text: string; section: string; index: number }[] = [];

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
							const data = JSON.parse(jsonStr);

							if (
								data.event === 'node_finished' &&
								data.data.node_type === 'llm'
							) {
								chunkCount++;
								if (chunkCount > 2) {
									const text = data.data.outputs.text || '';
									const section =
										sectionOrder.find((s) => text.includes(s)) || '';
									const sectionIndex = sectionOrder.indexOf(section);

									chunks.push({
										text,
										section,
										index: sectionIndex,
									});

									chunks.sort((a, b) => a.index - b.index);

									while (chunks.length > 0 && chunks[0].index !== -1) {
										const nextChunk = chunks.shift();
										if (nextChunk) {
											controller.enqueue(
												new TextEncoder().encode(nextChunk.text)
											);
										}
									}
								}
							}
						} catch (error) {
							console.error('Error parsing JSON:', error);
						}
					}
				}
			}

			// Output any remaining chunks in order
			chunks.sort((a, b) => a.index - b.index);
			for (const chunk of chunks) {
				controller.enqueue(new TextEncoder().encode(chunk.text));
			}

			controller.close();
		},
	});
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
