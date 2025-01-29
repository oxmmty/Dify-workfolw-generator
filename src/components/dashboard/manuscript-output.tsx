'use client';

import { Download } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import {
	Document,
	Page,
	Text,
	View,
	StyleSheet,
	Font,
	pdf,
} from '@react-pdf/renderer';

Font.register({
	family: 'Noto Sans JP',
	src: 'https://fonts.gstatic.com/s/notosansjp/v52/-F6jfjtqLzI2JPCgQBnw7HFyzSD-AsregP8VFBEj75s.ttf',
});

const styles = StyleSheet.create({
	page: {
		padding: 50,
		fontFamily: 'Noto Sans JP',
	},
	section: {
		marginBottom: 20,
	},
	heading1: {
		fontSize: 24,
		marginBottom: 15,
		fontWeight: 'bold',
	},
	heading2: {
		fontSize: 20,
		marginBottom: 12,
		fontWeight: 'bold',
	},
	heading3: {
		fontSize: 16,
		marginBottom: 10,
		fontWeight: 'bold',
	},
	paragraph: {
		fontSize: 12,
		lineHeight: 1.6,
		marginBottom: 8,
	},
});

interface ManuscriptOutputProps {
	manuscript: string;
	isLoading: boolean;
}

const PDFDocument = ({ content }: { content: string }) => {
	const sections = content.split(/(?=^#+ )/m);

	return (
		<Document>
			<Page size='A4' style={styles.page}>
				{sections.map((section, index) => {
					const lines = section.split('\n');
					const title = lines[0];
					const content = lines.slice(1).join('\n').trim();

					return (
						<View key={index} style={styles.section}>
							{title.startsWith('# ') && (
								<Text style={styles.heading1}>{title.slice(2)}</Text>
							)}
							{title.startsWith('## ') && (
								<Text style={styles.heading2}>{title.slice(3)}</Text>
							)}
							{title.startsWith('### ') && (
								<Text style={styles.heading3}>{title.slice(4)}</Text>
							)}
							<Text style={styles.paragraph}>{content}</Text>
						</View>
					);
				})}
			</Page>
		</Document>
	);
};

export function ManuscriptOutput({
	manuscript,
	isLoading,
}: ManuscriptOutputProps) {
	const handleDownload = async () => {
		const date = new Date();
		const blob = await pdf(<PDFDocument content={manuscript} />).toBlob();
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = `原稿-${date}.pdf`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(url);
	};

	return (
		<div className='min-h-screen'>
			<div className='sticky top-0 z-10'>
				<div className='bg-white/90 backdrop-blur-md border rounded-lg border-gray-200'>
					<div className='max-w-7xl mx-auto'>
						<div className='px-6 py-4 flex justify-between items-center'>
							<h2 className='text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent'>
								生成された原稿
							</h2>
							<button
								onClick={handleDownload}
								className='inline-flex items-center px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-sm'
								disabled={isLoading}
							>
								<Download className='w-4 h-4 mr-2' />
								PDFをダウンロード
							</button>
						</div>
					</div>
				</div>
			</div>

			<main className='max-w-7xl mx-auto py-8'>
				<div className='bg-white rounded-2xl shadow-xl ring-1 ring-gray-100 overflow-hidden'>
					<div className='p-8'>
						<div className='prose prose-lg max-w-none break-words prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-blue-600 prose-strong:text-gray-900 prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg space-y-6'>
							<ReactMarkdown
								components={{
									h1: ({ node, ...props }) => (
										<h1 className='text-3xl font-bold mt-6 mb-4' {...props} />
									),
									h2: ({ node, ...props }) => (
										<h2 className='text-2xl font-bold mt-5 mb-3' {...props} />
									),
									h3: ({ node, ...props }) => (
										<h3 className='text-xl font-bold mt-4 mb-2' {...props} />
									),
								}}
							>
								{manuscript}
							</ReactMarkdown>
						</div>
					</div>
				</div>

				<div className='mt-8 text-center text-sm text-gray-500'>
					スクロールして内容をご確認ください
				</div>
			</main>
		</div>
	);
}
