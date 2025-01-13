'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, Loader } from 'lucide-react';
import { generateManuscript } from '@/app/actions/actions';

export default function FileUpload() {
	const [file, setFile] = useState<File | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setFile(e.target.files[0]);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		// ToDo: Handel File Submissoin
	};

	return (
		<form onSubmit={handleSubmit} className='space-y-4'>
			<div className='flex items-center justify-center w-full'>
				<label
					htmlFor='dropzone-file'
					className='flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer border-accent hover:border-primary'
				>
					<div className='flex flex-col items-center justify-center pt-5 pb-6'>
						<Upload className='w-10 h-10 mb-3 text-muted-foreground' />
						<p className='mb-2 text-sm text-muted-foreground'>
							<span className='font-semibold'>Click to upload</span> or drag and
							drop
						</p>
						<p className='text-xs text-muted-foreground'>
							PDF or TXT (MAX. 10MB)
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
				<p className='text-sm text-muted-foreground'>
					Selected file: {file.name}
				</p>
			)}
			<button
				type='submit'
				disabled={!file || isLoading}
				className='w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed'
			>
				{isLoading ? (
					<>
						<Loader className='animate-spin -ml-1 mr-3 h-5 w-5' />
						Generating...
					</>
				) : (
					'Generate Manuscript'
				)}
			</button>
			{error && <p className='text-destructive mt-2'>{error}</p>}
		</form>
	);
}
