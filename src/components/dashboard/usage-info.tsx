export default function UsageInfo({ userId }: { userId: string }) {
	const used = 0;
	const limit = 10;
	const percentage = (used / limit) * 100;

	return (
		<div className='bg-blue-50 rounded-lg p-6 border border-blue-100'>
			<div className='flex items-center justify-between mb-4'>
				<h3 className='text-lg font-semibold text-gray-900'>Usage Overview</h3>
				<span className='text-sm font-medium text-blue-600'>
					{used} / {limit} manuscripts
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
						{limit - used} manuscripts remaining this month
					</span>
					<span className='text-gray-500'>{percentage.toFixed(0)}% used</span>
				</div>
			</div>
		</div>
	);
}
