'use client';

export default function LoadingPage() {
	return (
		<div className='min-h-[90svh] w-full flex flex-col items-center justify-center bg-gray-50 px-4'>
			<div className='bg-white rounded-lg shadow-lg p-8 flex flex-col items-center'>
				<div className='mb-4'>
					<div className='w-12 h-12 rounded-full border-4 border-gray-200 border-t-blue-600 animate-spin'></div>
				</div>
				<h2 className='text-xl font-semibold text-gray-900 mb-2'>Loading...</h2>
				<p className='text-gray-500 text-center'>
					Please wait while the page is loading
				</p>
			</div>
		</div>
	);
}
