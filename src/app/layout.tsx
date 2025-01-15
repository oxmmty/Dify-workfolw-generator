import './globals.css';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { Navbar } from '@/components/layout/navbar';
import AfterSignUpHandler from '@/components/auth/signup-handler';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'ManuscriptAI - Generate Manuscripts',
	description: 'Generate manuscripts from text or PDF files using AI',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ClerkProvider>
			<html lang='en' className='dark'>
				<body className={`${inter.className} bg-background text-foreground`}>
					<Navbar />
					<main className='container mx-auto px-4 py-8'>{children}</main>
					<AfterSignUpHandler />
				</body>
			</html>
		</ClerkProvider>
	);
}
