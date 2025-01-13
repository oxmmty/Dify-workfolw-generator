export default async function UsageInfo({ userId }: { userId: string }) {
	// const { used, limit } = await getUserUsage(userId);

	return (
		<div className='mt-6 bg-accent rounded-lg p-4'>
			<h3 className='text-lg font-semibold mb-2'>Usage</h3>
			<p className='text-sm text-muted-foreground mb-2'>
				You have generated {0} out of {10} manuscripts this month.
			</p>
			<div className='w-full bg-muted rounded-full h-2.5'>
				<div
					className='bg-primary h-2.5 rounded-full'
					style={{ width: `${(2 / 10) * 100}%` }}
				></div>
			</div>
		</div>
	);
}
