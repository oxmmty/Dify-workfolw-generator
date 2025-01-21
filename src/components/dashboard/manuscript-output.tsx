import { useEffect, useRef } from 'react';

interface ManuscriptOutputProps {
	manuscript: string;
}

export function ManuscriptOutput({ manuscript }: ManuscriptOutputProps) {
	const outputRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (outputRef.current) {
			outputRef.current.scrollTop = outputRef.current.scrollHeight;
		}
	}, [manuscript]);

	const formatContent = (content: string) => {
		const lines = content.split('\n');
		const formattedContent = [];
		let inCodeBlock = false;

		for (let i = 0; i < lines.length; i++) {
			const line = lines[i].trim();

			if (line.startsWith('```')) {
				inCodeBlock = !inCodeBlock;
				formattedContent.push(
					<pre key={i} className='bg-gray-100 p-2 rounded my-2'>
						<code>{line}</code>
					</pre>
				);
			} else if (inCodeBlock) {
				formattedContent.push(
					<pre key={i} className='bg-gray-100 p-2 rounded my-2'>
						<code>{line}</code>
					</pre>
				);
			} else if (line.startsWith('# ')) {
				formattedContent.push(
					<h1 key={i} className='text-3xl font-bold mt-8 mb-4'>
						{line.substring(2)}
					</h1>
				);
			} else if (line.startsWith('## ')) {
				formattedContent.push(
					<h2 key={i} className='text-2xl font-semibold mt-6 mb-3'>
						{line.substring(3)}
					</h2>
				);
			} else if (line.startsWith('### ')) {
				formattedContent.push(
					<h3 key={i} className='text-xl font-medium mt-4 mb-2'>
						{line.substring(4)}
					</h3>
				);
			} else if (line.startsWith('- ')) {
				formattedContent.push(
					<li key={i} className='ml-4'>
						{line.substring(2)}
					</li>
				);
			} else if (line === '') {
				formattedContent.push(<br key={i} />);
			} else {
				formattedContent.push(
					<p key={i} className='mb-4'>
						{line}
					</p>
				);
			}
		}

		return formattedContent;
	};

	return (
		<div
			ref={outputRef}
			className='mt-4 overflow-y-auto max-h-[calc(100vh-8rem)]'
		>
			<h3 className='text-xl font-bold mb-2'>生成された書籍原稿</h3>
			<div className='prose max-w-none bg-white p-6 rounded-lg shadow'>
				{formatContent(manuscript)}
			</div>
		</div>
	);
}
