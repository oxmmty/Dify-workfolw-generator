import { FileUpload } from '@/components/dashboard/file-upload';
import UsageInfo from '@/components/dashboard/usage-info';

interface DashboardProps {
	userId: string;
}

export default function Dashboard({ userId }: DashboardProps) {
	return (
		<div className='min-h-screen mt-8 bg-gray-50/50'>
			<div className='max-w-[1500px] mx-auto px-4 py-8'>
				<div className='grid grid-cols-12 gap-6'>
					{/* Main Content Area */}
					<div className='col-span-12'>
						<div className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden'>
							<div className='border-b border-gray-200 bg-gray-50/50'>
								<div className='px-6 py-4'>
									<h2 className='text-xl font-semibold text-gray-900'>
										Generate New Manuscript
									</h2>
									<p className='mt-1 text-sm text-gray-500'>
										Upload a document to begin the generation process
									</p>
								</div>
							</div>
							<div className='p-6'>
								<FileUpload />
								<div className='mt-6'>
									<UsageInfo userId={userId} />
								</div>
							</div>
						</div>
					</div>

					{/* History Section */}
					<div className='col-span-12'>
						<div className='bg-white rounded-xl shadow-sm border border-gray-200'>
							<div className='border-b border-gray-200 bg-gray-50/50'>
								<div className='px-6 py-4'>
									<h2 className='text-xl font-semibold text-gray-900'>
										Your Manuscripts
									</h2>
									<p className='mt-1 text-sm text-gray-500'>
										View and manage your generated manuscripts
									</p>
								</div>
							</div>
							<div className='p-6'>
								<div className='flex flex-col items-center justify-center py-12 px-4 text-center'>
									<div className='bg-gray-50 rounded-full p-4 mb-4'>
										<svg
											className='w-8 h-8 text-gray-400'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
											/>
										</svg>
									</div>
									<h3 className='text-lg font-medium text-gray-900 mb-2'>
										No manuscripts yet
									</h3>
									<p className='text-gray-500 text-sm max-w-sm'>
										Upload your first document to generate a manuscript. Your
										generated manuscripts will appear here.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
