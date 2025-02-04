import { getUserData } from '@/lib/user';

export default async function UsageInfo() {
	try {
		const { limit, used, percentage } = await getUserData();

		return (
			<div className='bg-blue-50 rounded-lg p-6 border border-blue-100'>
				<div className='flex items-center justify-between mb-4'>
					<h3 className='text-lg font-semibold text-gray-900'>
						使用方法の概要
					</h3>
					<span className='text-sm font-medium text-blue-600'>
						{used} / {limit} 原稿
					</span>
				</div>

				<div className='space-y-4'>
					<div className='w-full bg-blue-100 rounded-full h-2'>
						<div
							className='bg-blue-600 h-2 rounded-full transition-all duration-300'
							style={{ width: `${percentage}%` }}
						></div>
					</div>

					<div className='flex items-center justify-between text-sm'>
						<span className='text-gray-600'>
							{limit - used} 今月残っている原稿
						</span>
						<span className='text-gray-500'>
							{percentage.toFixed(0)}% 使用済み
						</span>
					</div>
				</div>
			</div>
		);
	} catch (error) {
		console.error('Error in UsageInfo:', error);
		return (
			<div>
				使用状況情報を取得中にエラーが発生しました。しばらくしてからもう一度お試しください。
			</div>
		);
	}
}
