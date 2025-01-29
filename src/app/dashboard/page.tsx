import { FileUpload } from '@/components/dashboard/file-upload';
import UsageInfo from '@/components/dashboard/usage-info';

export default async function Dashboard() {
	return (
		<main className='min-h-svh mt-8'>
			<section className='max-w-[1500px] mx-auto py-8'>
				<div className='grid grid-cols-12 gap-6'>
					<div className='col-span-12'>
						<div className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden'>
							<div className='border-b border-gray-200 bg-gray-50/50'>
								<div className='px-6 py-4'>
									<h2 className='text-xl font-semibold text-gray-900'>
										新しい原稿を生成する
									</h2>
									<p className='mt-1 text-sm text-gray-500'>
										生成プロセスを開始するにはドキュメントをアップロードしてください
									</p>
								</div>
							</div>
							<div className='p-2 md:p-6'>
								<FileUpload />
							</div>
						</div>
					</div>
				</div>
			</section>

			<UsageInfo />
		</main>
	);
}
