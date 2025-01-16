'use client';

import { SignInButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { FileText, Zap, Shield, Clock, ArrowRight } from 'lucide-react';

export function HomePage() {
	const { isSignedIn } = useUser();

	const features = [
		{
			icon: <FileText className='h-6 w-6 text-blue-500' />,
			title: 'スマートPDF処理',
			description: '文書の構造と意味を理解し保持する高度なAI技術を搭載。',
		},
		{
			icon: <Zap className='h-6 w-6 text-blue-500' />,
			title: '超高速処理',
			description: 'プロフェッショナルな書籍原稿を数時間ではなく数分で作成。',
		},
		{
			icon: <Shield className='h-6 w-6 text-blue-500' />,
			title: '安全性とプライバシー',
			description: '文書は暗号化され、処理後は自動的に削除されます。',
		},
		{
			icon: <Clock className='h-6 w-6 text-blue-500' />,
			title: '24時間365日利用可能',
			description: 'いつでもどこでも一貫した品質でPDFを書籍に変換。',
		},
	];

	const testimonials = [
		{
			name: '佐藤 由美',
			role: '独立作家',
			content:
				'このツールのおかげで、フォーマット作業に費やす時間が大幅に削減できました。出力の品質も申し分ありません！',
		},
		{
			name: '田中 健一',
			role: '出版コンサルタント',
			content:
				'ワークフローを一変させる画期的なツールです。フォーマット作業の時間が75%も削減されました。',
		},
		{
			name: '山田 恵子',
			role: 'コンテンツクリエイター',
			content:
				'使い方が非常に簡単で、常にプロフェッショナルな結果が得られます。',
		},
	];

	return (
		<div className='min-h-screen'>
			{/* Hero Section */}
			<section className='relative bg-white overflow-hidden'>
				<div className='max-w-7xl mx-auto'>
					<div className='relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32'>
						<main className='mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28'>
							<div className='sm:text-center lg:text-left'>
								<h1 className='text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl'>
									<span className='block'>PDFを</span>
									<span className='block text-blue-600'>
										プロフェッショナルな書籍に変換
									</span>
								</h1>
								<p className='mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0'>
									AIの力でPDF文書を完璧にフォーマットされた書籍原稿に変換。時間を節約し、一貫性を保ちながら、より速く出版できます。
								</p>
								<div className='mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start'>
									{isSignedIn ? (
										<Link
											href='/dashboard'
											className='inline-flex items-center rounded-md bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors'
										>
											ダッシュボードへ
											<ArrowRight className='ml-2 h-5 w-5' />
										</Link>
									) : (
										<div className='space-x-4'>
											<SignInButton mode='modal'>
												<button className='inline-flex items-center px-6 py-3 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>
													始める
												</button>
											</SignInButton>
											<Link
												href='/pricing'
												className='inline-flex items-center rounded-md bg-blue-50 px-6 py-3 text-base font-medium text-blue-600 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors'
											>
												料金を見る
											</Link>
										</div>
									)}
								</div>
							</div>
						</main>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className='py-16 bg-gray-50'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center'>
						<h2 className='text-3xl font-bold text-gray-900'>
							なぜ私たちのプラットフォームを選ぶのか？
						</h2>
						<p className='mt-4 text-lg text-gray-600'>
							PDFをプロフェッショナルな書籍原稿に変換するために必要なすべてを提供
						</p>
					</div>

					<div className='mt-12 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
						{features.map((feature, index) => (
							<div
								key={index}
								className='relative p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow'
							>
								<div className='absolute top-6 left-6'>{feature.icon}</div>
								<div className='pt-12'>
									<h3 className='text-lg font-medium text-gray-900'>
										{feature.title}
									</h3>
									<p className='mt-2 text-base text-gray-500'>
										{feature.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* How It Works Section */}
			<section className='py-16 bg-white'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<h2 className='text-3xl font-bold text-center text-gray-900'>
						使い方
					</h2>
					<div className='mt-12 grid gap-8 grid-cols-1 md:grid-cols-3'>
						{[
							{
								step: '1',
								title: 'PDFをアップロード',
								description:
									'安全なプラットフォームにPDFファイルをドラッグ＆ドロップするだけ',
							},
							{
								step: '2',
								title: 'AI処理',
								description: '高度なAIがコンテンツを分析し変換します',
							},
							{
								step: '3',
								title: '結果をダウンロード',
								description:
									'プロフェッショナルにフォーマットされた書籍原稿を入手',
							},
						].map((item, index) => (
							<div key={index} className='text-center'>
								<div className='flex items-center justify-center w-12 h-12 mx-auto bg-blue-100 text-blue-600 rounded-full text-xl font-bold'>
									{item.step}
								</div>
								<h3 className='mt-4 text-lg font-medium text-gray-900'>
									{item.title}
								</h3>
								<p className='mt-2 text-base text-gray-500'>
									{item.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Testimonials Section */}
			<section className='py-16 bg-gray-50'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<h2 className='text-3xl font-bold text-center text-gray-900'>
						ユーザーの声
					</h2>
					<div className='mt-12 grid gap-8 grid-cols-1 md:grid-cols-3'>
						{testimonials.map((testimonial, index) => (
							<div
								key={index}
								className='bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow'
							>
								<p className='text-gray-600 italic'>
									「{testimonial.content}」
								</p>
								<div className='mt-4'>
									<p className='font-medium text-gray-900'>
										{testimonial.name}
									</p>
									<p className='text-gray-500'>{testimonial.role}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className='bg-blue-600 py-16'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center'>
						<h2 className='text-3xl font-bold text-white'>
							PDFを変換する準備はできましたか？
						</h2>
						<p className='mt-4 text-xl text-blue-100'>
							書籍制作プロセスを効率化した多くの満足ユーザーに加わりましょう
						</p>
						<div className='mt-8'>
							{isSignedIn ? (
								<Link
									href='/dashboard'
									className='inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 transition-colors'
								>
									ダッシュボードへ
									<ArrowRight className='ml-2 h-5 w-5' />
								</Link>
							) : (
								<SignInButton mode='modal'>
									<button className='inline-flex border items-center px-6 py-3 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>
										始める
									</button>
								</SignInButton>
							)}
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
