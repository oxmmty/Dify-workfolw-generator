'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, Loader, AlertCircle, Info } from 'lucide-react';
import {
	uploadFile,
	runWorkflow,
	getWorkflowRunDetail,
} from '@/app/actions/actions';
import { ManuscriptOutput } from './manuscript-output';

export function FileUpload() {
	const [file, setFile] = useState<File | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [result, setResult] = useState<any | null>(null);
	const router = useRouter();

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setFile(e.target.files[0]);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!file) return;

		setIsLoading(true);
		setError(null);
		setResult(null);

		try {
			const formData = new FormData();
			formData.append('file', file);
			formData.append('user', 'test-user');

			const uploadResult = await uploadFile(formData);
			const workflowResult = await runWorkflow(uploadResult.id, 'test-user');

			if (workflowResult.status === 'running') {
				const finalResult = await pollWorkflowResult(
					workflowResult.workflow_run_id
				);
				setResult(finalResult);
			} else {
				setResult(workflowResult);
			}

			router.refresh();
		} catch (err) {
			console.error('Error:', err);
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError('An unknown error occurred');
			}
		} finally {
			setIsLoading(false);
		}
	};

	const pollWorkflowResult = async (
		workflowRunId: string,
		maxAttempts = 10
	): Promise<any> => {
		for (let i = 0; i < maxAttempts; i++) {
			const result = await getWorkflowRunDetail(workflowRunId);
			if (result.status !== 'running') {
				return result;
			}
			await new Promise((resolve) => setTimeout(resolve, 2000));
		}
		throw new Error('Workflow execution timed out');
	};

	return (
		<div className='h-screen bg-gray-50'>
			<div className='h-16 bg-white border-b flex items-center px-6'>
				<h1 className='text-xl font-semibold text-gray-800'>
					Document Processing
				</h1>
			</div>

			<div className='h-[calc(100vh-4rem)] flex'>
				<div className='w-96 border-r bg-white'>
					<div className='h-full flex flex-col'>
						<div className='p-6'>
							<h2 className='text-lg font-medium text-gray-800 mb-4'>
								Upload Document
							</h2>
							<form onSubmit={handleSubmit} className='space-y-4'>
								<div className='flex items-center justify-center w-full'>
									<label
										htmlFor='dropzone-file'
										className='flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all duration-200'
									>
										<div className='flex flex-col items-center justify-center pt-5 pb-6'>
											<Upload className='w-8 h-8 mb-3 text-gray-400' />
											<p className='mb-2 text-sm text-gray-500'>
												<span className='font-semibold'>Click to upload</span>{' '}
												or drag and drop
											</p>
											<p className='text-xs text-gray-500'>
												PDF or TXT (MAX. 15MB)
											</p>
										</div>
										<input
											id='dropzone-file'
											type='file'
											className='hidden'
											onChange={handleFileChange}
											accept='.txt,.pdf'
										/>
									</label>
								</div>
								{file && (
									<div className='p-3 bg-blue-50 rounded-md border border-blue-100'>
										<p className='text-sm text-blue-700'>
											Selected: <span className='font-medium'>{file.name}</span>
										</p>
									</div>
								)}
								<button
									type='submit'
									disabled={!file || isLoading}
									className='w-full px-4 py-2.5 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium'
								>
									{isLoading ? (
										<div className='flex items-center justify-center'>
											<Loader className='w-4 h-4 mr-2 animate-spin' />
											<span>Processing...</span>
										</div>
									) : (
										'Process Document'
									)}
								</button>
							</form>
						</div>

						<div className='px-6 pb-6 overflow-y-auto'>
							{error && (
								<div className='mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-start'>
									<AlertCircle className='w-5 h-5 mr-2 flex-shrink-0 mt-0.5' />
									<div>
										<p className='font-medium'>Error</p>
										<p className='text-sm mt-1'>{error}</p>
										{error.includes('not published') && (
											<div className='mt-2 p-2 bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-md flex items-start'>
												<Info className='w-4 h-4 mr-2 flex-shrink-0 mt-0.5' />
												<p className='text-sm'>
													To publish your workflow, go to your Dify account,
													select the workflow, and click the "Publish" button.
												</p>
											</div>
										)}
									</div>
								</div>
							)}
						</div>
					</div>
				</div>

				<div className='flex-1 overflow-hidden'>
					<div className='h-full overflow-y-auto px-6 py-6'>
						{result?.data?.outputs?.formatted_manuscript ? (
							<ManuscriptOutput
								manuscript={result.data.outputs.formatted_manuscript}
							/>
						) : (
							<div className='h-full flex items-center justify-center'>
								<div className='text-center'>
									<div className='flex justify-center'>
										<Upload className='w-12 h-12 text-gray-300' />
									</div>
									<h3 className='mt-4 text-lg font-medium text-gray-700'>
										No Document Processed
									</h3>
									<p className='mt-2 text-gray-500'>
										Upload a document to see the generated manuscript here
									</p>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
