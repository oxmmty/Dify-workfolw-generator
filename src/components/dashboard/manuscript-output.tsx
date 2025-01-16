interface ManuscriptOutputProps {
	manuscript: string;
}

export function ManuscriptOutput({ manuscript }: ManuscriptOutputProps) {
	return (
		<div className='mt-4'>
			<h3 className='text-xl font-bold mb-2'>生成された原稿</h3>
			<div className='prose max-w-none bg-white p-6 rounded-lg shadow'>
				{manuscript.split('\n').map((paragraph, index) => {
					if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
						const headerText = paragraph.replace(/\*\*/g, '');
						if (headerText.toLowerCase().includes('title')) {
							return (
								<h1 key={index} className='text-3xl font-bold mb-6'>
									{headerText.split(': ')[1]}
								</h1>
							);
						}
						return (
							<h2 key={index} className='text-2xl font-bold mt-6 mb-4'>
								{headerText}
							</h2>
						);
					}
					return paragraph ? (
						<p key={index} className='mb-4 text-gray-700'>
							{paragraph}
						</p>
					) : (
						<br key={index} />
					);
				})}
			</div>
		</div>
	);
}
