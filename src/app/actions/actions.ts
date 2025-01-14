'use server';

const API_KEY = process.env.DIFY_API_KEY;
const API_URL = process.env.DIFY_API_URL;

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
