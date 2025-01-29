'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, Loader, AlertCircle } from 'lucide-react';
import {
	uploadFile,
	checkUsageLimit,
	updateUsage,
} from '@/app/actions/actions';
import { ManuscriptOutput } from './manuscript-output';
import { useUser } from '@clerk/nextjs';
import { API_KEY } from '@/lib/config';

export function FileUpload() {
	const { user } = useUser();
	const [file, setFile] = useState<File | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [result, setResult] = useState<string>('');
	const router = useRouter();
	const [usageStatus, setUsageStatus] = useState<{
		canGenerate: boolean;
		used: number;
		limit: number;
	} | null>(null);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setFile(e.target.files[0]);
		}
	};

	useEffect(() => {
		const checkUsage = async () => {
			try {
				const status = await checkUsageLimit();
				setUsageStatus(status);
			} catch (err) {
				console.error('Error checking usage:', err);
				setError('利用制限の確認に失敗しました');
			}
		};

		checkUsage();
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!file) return;

		try {
			const status = await checkUsageLimit();
			setUsageStatus(status);

			if (!status.canGenerate) {
				setError(
					`利用制限に達しました（${status.used}/${status.limit}）。プランをアップグレードして続行してください。`
				);
				return;
			}

			setIsLoading(true);
			setError(null);
			setResult('');

			const formData = new FormData();
			formData.append('file', file);
			formData.append('user', user?.fullName ?? 'Unknown User');

			const uploadResult = await uploadFile(formData);

			const response = await fetch('https://api.dify.ai/v1/workflows/run', {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${API_KEY}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					inputs: {
						knowledge: {
							transfer_method: 'local_file',
							upload_file_id: uploadResult.id,
							type: 'document',
						},
					},
					response_mode: 'streaming',
					user: user?.fullName ?? 'Unknown User',
				}),
			});

			if (!response.ok) {
				throw new Error(`Streaming failed: ${response.status}`);
			}

			if (!response.body) throw new Error('No response body');

			const reader = response.body.getReader();
			const decoder = new TextDecoder();
			let buffer = '';

			while (true) {
				const { done, value } = await reader.read();
				if (done) break;

				buffer += decoder.decode(value, { stream: true });
				const lines = buffer.split('\n\n');
				buffer = lines.pop() || '';

				for (const line of lines) {
					if (line.startsWith('data: ')) {
						try {
							const eventData = JSON.parse(line.slice(6));
							const messageContent =
								eventData.data?.answer ||
								eventData.data?.text ||
								eventData.data?.message ||
								'';

							if (messageContent && eventData.event !== 'ping') {
								setResult((prev) => prev + messageContent);
							}
						} catch (e) {
							console.error('Failed to parse event data:', e);
						}
					}
				}
			}

			if (response.ok) {
				try {
					await updateUsage();
					console.log('Usage updated successfully');
				} catch (error) {
					console.error('Error updating usage:', error);
				}
			}

			router.refresh();
		} catch (err) {
			console.error('Error:', err);
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError('不明なエラーが発生しました');
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<main className='h-[calc(100vh-4rem)] flex flex-col md:flex-row'>
			<section>
				<div className='h-full flex flex-col border rounded-lg'>
					<div className='p-2 md:p-6'>
						<h2 className='text-lg font-medium text-gray-800 mb-4'>
							文書をアップロード
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
											<span className='font-semibold'>
												クリックしてアップロード
											</span>{' '}
											またはドラッグ＆ドロップ
										</p>
										<p className='text-xs text-gray-500'>
											PDFまたはTXT（最大10MB）
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
										選択済み: <span className='font-medium'>{file.name}</span>
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
										<span>原稿生成中...</span>
									</div>
								) : (
									'原稿を生成'
								)}
							</button>
						</form>
					</div>

					<div className='px-6 pb-6 overflow-y-auto'>
						{error && (
							<div className='mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-start'>
								<AlertCircle className='w-5 h-5 mr-2 flex-shrink-0 mt-0.5' />
								<div>
									<p className='font-medium'>エラー</p>
									<p className='text-sm mt-1'>{error}</p>
								</div>
							</div>
						)}
					</div>
				</div>
			</section>

			<section className='flex-1 min-h-screen'>
				<div className='h-full overflow-y-auto md:px-6 '>
					{result ? (
						<div className='mt-4 md:mt-0'>
							<ManuscriptOutput manuscript={result} isLoading={isLoading} />
						</div>
					) : (
						<div className='h-full flex items-center justify-center'>
							<div className='text-center'>
								<div className='flex justify-center'>
									<Upload className='w-12 h-12 text-gray-300' />
								</div>
								<h3 className='mt-4 text-lg font-medium text-gray-700'>
									生成された原稿がありません
								</h3>
								<p className='mt-2 text-gray-500'>
									文書をアップロードすると、ここに生成された書籍原稿が表示されます
								</p>
							</div>
						</div>
					)}
				</div>
			</section>
		</main>
	);
}
