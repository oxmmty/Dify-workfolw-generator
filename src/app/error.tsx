'use client';

export default function ErrorPage({
	error = 'Something went wrong',
	reset = () => window.location.reload(),
}) {
	return (
		<div className='min-h-screen w-full flex items-center justify-center bg-gray-50 px-4'>
			<div className='max-w-md w-full'>
				<div className='bg-white rounded-lg shadow-lg p-6 mb-6 border border-red-100'>
					<div className='flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4'>
						<svg
							className='w-6 h-6 text-red-600'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M6 18L18 6M6 6l12 12'
							/>
						</svg>
					</div>

					<h1 className='text-center text-2xl font-bold text-gray-900 mb-2'>
						Oops!
					</h1>

					<p className='text-center text-gray-600 mb-6'>{error}</p>
					<div className='flex flex-col gap-3'>
						<button
							onClick={reset}
							className='w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-200'
						>
							Try Again
						</button>

						<button
							onClick={() => (window.location.href = '/')}
							className='w-full bg-gray-50 text-gray-600 py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors duration-200'
						>
							Return Home
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
