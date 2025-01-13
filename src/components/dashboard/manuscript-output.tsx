interface ManuscriptOutputProps {
	manuscript: string;
}

export default function ManuscriptOutput({
	manuscript,
}: ManuscriptOutputProps) {
	return (
		<div className='mt-4'>
			<h3 className='text-xl font-bold mb-2'>Generated Manuscript</h3>
			<pre className='whitespace-pre-wrap bg-gray-100 p-4 rounded'>
				{manuscript}
			</pre>
		</div>
	);
}
