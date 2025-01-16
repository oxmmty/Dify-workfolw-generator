'use client';

import { Check, HelpCircle } from 'lucide-react';
import { useState } from 'react';

export function Pricing() {
	const [isAnnual, setIsAnnual] = useState(true);

const tiers = [
	{
		name: 'スタータープラン',
		description: 'ManuscriptAIを試すのに最適',
		price: isAnnual ? 9 : 12,
		features: [
			'月50原稿まで',
			'基本的な編集提案',
			'文法・スペルチェック',
			'Word・PDFへのエクスポート',
			'メールサポート',
		],
		cta: '無料トライアルを開始',
		highlighted: false,
	},
	{
		name: 'プロフェッショナル',
		description: 'プロの作家に最適',
		price: isAnnual ? 29 : 39,
		features: [
			'月200原稿まで',
			'高度な文体提案',
			'剽窃チェック',
			'引用形式の整形',
			'優先メールサポート',
			'カスタムテンプレート',
			'変更履歴の追跡',
		],
		cta: '始める',
		highlighted: true,
	},
	{
		name: 'エンタープライズ',
		description: 'チームや組織向け',
		price: isAnnual ? 99 : 129,
		features: [
			'無制限の原稿',
			'チームコラボレーション',
			'管理者ダッシュボード',
			'API アクセス',
			'カスタムAIトレーニング',
			'24時間年中無休のサポート',
			'専任アカウントマネージャー',
			'カスタム連携',
		],
		cta: '営業に問い合わせ',
		highlighted: false,
	},
];

	return (
		<div className='min-h-screen bg-gray-50 py-20'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				{/* Header */}
				<div className='text-center mb-16'>
					<h1 className='text-4xl font-bold text-gray-900 mb-4'>
						シンプルで透明性のある料金プラン
					</h1>
					<p className='text-xl text-gray-600 mb-8'>
						あなたの執筆ニーズに合わせた最適なプランをお選びください
					</p>

					{/* Billing Toggle */}
					<div className='flex items-center justify-center gap-4'>
						<span
							className={`text-sm ${
								!isAnnual ? 'text-gray-900 font-medium' : 'text-gray-500'
							}`}
						>
							月額プラン
						</span>
						<button
							onClick={() => setIsAnnual(!isAnnual)}
							className='relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-blue-600'
							role='switch'
							aria-checked={isAnnual}
						>
							<span
								className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
									isAnnual ? 'translate-x-5' : 'translate-x-0'
								}`}
							/>
						</button>
						<span
							className={`text-sm ${
								isAnnual ? 'text-gray-900 font-medium' : 'text-gray-500'
							}`}
						>
							年額プラン
							<span className='ml-1.5 inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800'>
								20%お得
							</span>
						</span>
					</div>
				</div>

				{/* Pricing Cards */}
				<div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
					{tiers.map((tier) => (
						<div
							key={tier.name}
							className={`relative rounded-2xl ${
								tier.highlighted
									? 'bg-blue-600 text-white shadow-xl scale-105'
									: 'bg-white text-gray-900 shadow-lg'
							} p-8 transition-all duration-200 hover:scale-[1.02]`}
						>
							{tier.highlighted && (
								<div className='absolute -top-4 left-1/2 -translate-x-1/2'>
									<span className='inline-flex items-center rounded-full bg-blue-200 px-4 py-1 text-sm font-semibold text-blue-800'>
										人気プラン
									</span>
								</div>
							)}

							<div className='mb-6'>
								<h2 className='text-2xl font-bold mb-2'>{tier.name}</h2>
								<p
									className={
										tier.highlighted ? 'text-blue-100' : 'text-gray-500'
									}
								>
									{tier.description}
								</p>
							</div>

							<div className='mb-8'>
								<p className='flex items-baseline'>
									<span className='text-4xl font-bold'>${tier.price}</span>
									<span
										className={`ml-2 ${
											tier.highlighted ? 'text-blue-100' : 'text-gray-500'
										}`}
									>
										/月
									</span>
								</p>
								<p
									className={`text-sm mt-1 ${
										tier.highlighted ? 'text-blue-100' : 'text-gray-500'
									}`}
								>
									{isAnnual ? '年間契約' : '月額契約'}
								</p>
							</div>

							<ul className='mb-8 space-y-4'>
								{tier.features.map((feature) => (
									<li key={feature} className='flex items-start'>
										<Check
											className={`h-5 w-5 mr-3 flex-shrink-0 ${
												tier.highlighted ? 'text-blue-200' : 'text-blue-500'
											}`}
										/>
										<span className='text-sm'>{feature}</span>
									</li>
								))}
							</ul>

							<button
								className={`w-full rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
									tier.highlighted
										? 'bg-white text-blue-600 hover:bg-blue-50'
										: 'bg-blue-600 text-white hover:bg-blue-700'
								}`}
							>
								{tier.cta}
							</button>
						</div>
					))}
				</div>
				<div className='mt-20'>
					<h2 className='text-2xl font-bold text-center mb-8'>よくある質問</h2>
					<div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
						{[
							{
								q: '無料トライアルには何が含まれますか？',
								a: '14日間の無料トライアルでは、プロフェッショナルプランのすべての機能を10原稿まで利用できます。',
							},
							{
								q: '後からプランを変更できますか？',
								a: 'はい、いつでもプランのアップグレードまたはダウングレードが可能です。変更は即時に反映されます。',
							},
							{
								q: '返金は可能ですか？',
								a: '有料プランには30日間の返金保証があります。理由を問わず返金いたします。',
							},
						].map((faq) => (
							<div key={faq.q} className='bg-white rounded-lg p-6 shadow-sm'>
								<h3 className='font-semibold text-gray-900 mb-2 flex items-center gap-2'>
									<HelpCircle className='h-5 w-5 text-blue-500' />
									{faq.q}
								</h3>
								<p className='text-gray-600'>{faq.a}</p>
							</div>
						))}
					</div>
				</div>

				{/* CTA Section */}
				<div className='mt-20 text-center'>
					<p className='text-gray-600 mb-4'>
						ご不明な点がございましたら、お気軽にお問い合わせください。
					</p>
					<button className='inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors'>
						サポートに問い合わせ
					</button>
				</div>
			</div>
		</div>
	);
}
