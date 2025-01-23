'use client';

import { Home, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Custom404() {
	const router = useRouter();

	return (
		<div className='min-h-[90svh] flex items-center justify-center'>
			<div className='max-w-2xl px-8 py-16 text-center'>
				<div className='mb-8'>
					<div className='relative inline-block'>
						<div className='text-[150px] font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text'>
							404
						</div>
					</div>
				</div>

				<h1 className='mb-4 text-3xl font-bold tracking-tight text-gray-900'>
					ページが見つかりません
				</h1>

				<p className='mb-8 text-lg text-gray-600'>
					申し訳ありませんが、お探しのページは利用できません。
					ページが移動された、削除された、またはアクセス権がない可能性があります。
					URLを確認するか、これが誤りであると思われる場合はサポートにお問い合わせください。
				</p>

				<div className='flex flex-col sm:flex-row gap-4 justify-center'>
					<button
						onClick={() => router.back()}
						className='inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 shadow-sm'
					>
						<ArrowLeft className='w-4 h-4 mr-2' />
						戻ってください
					</button>

					<button
						onClick={() => router.push('/')}
						className='inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors duration-200 shadow-sm'
					>
						<Home className='w-4 h-4 mr-2' />
						ホームに戻る
					</button>
				</div>
			</div>
		</div>
	);
}
