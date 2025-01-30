'use client';

import { SignInButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { ArrowRight, Upload } from 'lucide-react';

export function HomePage() {
	const { isSignedIn } = useUser();

	return (
		<div className='min-h-screen bg-gradient-to-b from-white to-blue-50'>
			{/* Hero Section */}
			<section className='relative overflow-hidden bg-white'>
				<div className='absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-white'></div>
				<div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32 lg:pt-32'>
					<div className='lg:grid lg:grid-cols-12 lg:gap-8'>
						<div className='sm:text-center lg:text-left lg:col-span-7'>
							<div className='space-y-8'>
								<h1 className='text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl'>
									<span className='inline-block mb-4 bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent'>
										学習データを
									</span>
									<span className='block text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900'>
										一瞬で書籍原稿データに変換
									</span>
								</h1>
								<p className='text-lg sm:text-xl text-gray-600 max-w-3xl'>
									AIの力でPDF文書を完璧にフォーマットされた書籍原稿に変換。
									<br />
									時間を節約し、一貫性を保ちながら、より速く出版できます。
								</p>
								<div className='flex flex-col sm:flex-row gap-4 sm:items-center lg:justify-start sm:justify-center'>
									{isSignedIn ? (
										<Link
											href='/dashboard'
											className='inline-flex items-center justify-center rounded-lg bg-blue-600 px-8 py-4 text-base font-medium text-white shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 hover:shadow-xl w-full sm:w-auto'
										>
											ダッシュボードへ
											<ArrowRight className='ml-2 h-5 w-5' />
										</Link>
									) : (
										<SignInButton mode='modal'>
											<button className='inline-flex items-center justify-center px-8 py-4 rounded-lg text-base font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg hover:shadow-xl w-full sm:w-auto'>
												始める
											</button>
										</SignInButton>
									)}
								</div>
							</div>
						</div>
						<div className='mt-16 sm:mt-24 lg:mt-0 lg:col-span-5'>
							<div className='bg-white shadow-xl rounded-2xl p-8'>
								<div className='h-64 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg flex items-center justify-center'>
									<div className='text-center p-6'>
										<div className='w-16 h-16 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center'>
											<Upload className='h-8 w-8 text-white' />
										</div>
										<p className='text-sm text-gray-600'>
											PDFやテキストファイルを
											<br />
											ドラッグ＆ドロップ
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* How It Works Section */}
			<section className='py-24 bg-white'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<h2 className='text-3xl font-bold text-center border-b-[1px] pb-4 text-gray-900'>
						使い方
					</h2>
					<div className='mt-16 grid gap-12 grid-cols-1 md:grid-cols-3'>
						{[
							{
								step: '1',
								title: '学習させたいデータをアップロード',
								description: 'PDFやTXTファイルをドラッグ＆ドロップします',
							},
							{
								step: '2',
								title: 'AI処理',
								description: 'AIが学習データを分析して書籍原稿に変換します',
							},
							{
								step: '3',
								title: 'ファイルをダウンロード',
								description: '原稿をコピー、もしくはPDFデータでダウンロード',
							},
						].map((item, index) => (
							<div
								key={index}
								className='text-center group hover:transform hover:scale-105 transition-all duration-200'
							>
								<div className='flex items-center justify-center w-16 h-16 mx-auto bg-blue-100 text-blue-600 rounded-full text-2xl font-bold shadow-md group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200'>
									{item.step}
								</div>
								<h3 className='mt-6 text-xl font-semibold text-gray-900'>
									{item.title}
								</h3>
								<p className='mt-4 text-base text-gray-600'>
									{item.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className='bg-gradient-to-r rounded-xl from-blue-600 to-blue-700 py-20'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center'>
						<h2 className='text-4xl font-bold text-white'>
							準備はできましたか？
						</h2>
						<p className='mt-6 text-xl text-blue-100'>
							最先端のAIで効率的に書籍原稿を作成してみましょう
						</p>
						<div className='mt-10'>
							{isSignedIn ? (
								<Link
									href='/dashboard'
									className='inline-flex items-center px-8 py-4 border-2 border-white text-lg font-medium rounded-lg text-white hover:bg-white hover:text-blue-600 transition-all duration-200'
								>
									ダッシュボードへ
									<ArrowRight className='ml-2 h-5 w-5' />
								</Link>
							) : (
								<SignInButton mode='modal'>
									<button className='inline-flex items-center px-8 py-4 rounded-lg text-lg font-medium text-blue-600 bg-white hover:bg-blue-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 shadow-lg hover:shadow-xl'>
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
