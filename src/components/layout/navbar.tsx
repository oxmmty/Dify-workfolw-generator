'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/nextjs';
import { Menu, X, FileText, BookOpen, CreditCard } from 'lucide-react';

const NavLink = ({
	href,
	children,
	className = '',
	onClick = () => {},
}: {
	href: string;
	children: React.ReactNode;
	className?: string;
	onClick?: () => void;
}) => {
	const pathname = usePathname();
	const isActive = pathname === href;

	return (
		<Link
			href={href}
			onClick={onClick}
			className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
				isActive
					? 'bg-blue-100 text-blue-600'
					: 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
			} ${className}`}
		>
			{children}
		</Link>
	);
};

export function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 10);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const pathname = usePathname();
	useEffect(() => {
		setIsOpen(false);
	}, [pathname]);

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setIsOpen(false);
			}
		};

		document.addEventListener('keydown', handleEscape);
		return () => document.removeEventListener('keydown', handleEscape);
	}, []);

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}
		return () => {
			document.body.style.overflow = 'unset';
		};
	}, [isOpen]);

	const navItems = [
		{ href: '/dashboard', icon: FileText, label: 'Dashboard' },
		{ href: '/pricing', icon: CreditCard, label: 'Pricing' },
	];

	return (
		<>
			<nav
				className={`fixed top-0 w-full z-50 transition-all duration-300 ${
					scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-white'
				}`}
			>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='flex items-center justify-between h-16'>
						{/* Logo and Brand */}
						<div className='flex items-center'>
							<Link href='/' className='flex items-center space-x-2'>
								<BookOpen className='h-6 w-6 text-blue-600' />
								<span className='text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent'>
									ManuscriptAI
								</span>
							</Link>

							{/* Desktop Navigation */}
							<SignedIn>
								<div className='hidden md:flex ml-10 items-center space-x-2'>
									{navItems.map((item) => (
										<NavLink key={item.href} href={item.href}>
											<item.icon className='mr-2 h-4 w-4' />
											{item.label}
										</NavLink>
									))}
								</div>
							</SignedIn>
						</div>

						{/* Desktop Auth Section */}
						<div className='hidden md:flex items-center space-x-4'>
							<SignedIn>
								<div className='flex items-center space-x-4'>
									<div className='px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium'>
										10 Credits
									</div>
									<UserButton
										afterSignOutUrl='/'
										appearance={{
											elements: {
												avatarBox:
													'w-9 h-9 rounded-full ring-2 ring-blue-100 ring-offset-2',
											},
										}}
									/>
								</div>
							</SignedIn>
							<SignedOut>
								<NavLink href='/pricing'>Pricing</NavLink>
								<SignInButton mode='modal'>
									<button className='inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>
										Sign In
									</button>
								</SignInButton>
							</SignedOut>
						</div>

						{/* Mobile Menu Button */}
						<button
							onClick={() => setIsOpen(!isOpen)}
							type='button'
							className='inline-flex md:hidden items-center justify-center p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500'
							aria-expanded={isOpen}
							aria-controls='mobile-menu'
							aria-label='Toggle mobile menu'
						>
							<span className='sr-only'>
								{isOpen ? 'Close main menu' : 'Open main menu'}
							</span>
							{!isOpen ? (
								<Menu className='block h-6 w-6' aria-hidden='true' />
							) : (
								<X className='block h-6 w-6' aria-hidden='true' />
							)}
						</button>
					</div>
				</div>

				{/* Mobile Menu Overlay */}
				{isOpen && (
					<div
						className='fixed inset-0 bg-black bg-opacity-50 md:hidden'
						aria-hidden='true'
						onClick={() => setIsOpen(false)}
					/>
				)}

				{/* Mobile Menu */}
				<div
					id='mobile-menu'
					className={`transform transition-all duration-300 ease-in-out md:hidden fixed inset-y-0 right-0 w-64 bg-white shadow-xl ${
						isOpen ? 'translate-x-0' : 'translate-x-full'
					}`}
				>
					<div className='h-16 flex items-center justify-end px-4'>
						<button
							onClick={() => setIsOpen(false)}
							className='p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500'
							aria-label='Close menu'
						>
							<X className='h-6 w-6' aria-hidden='true' />
						</button>
					</div>
					<div className='px-4 py-2 space-y-1'>
						{navItems.map((item) => (
							<NavLink
								key={item.href}
								href={item.href}
								className='w-full justify-start'
								onClick={() => setIsOpen(false)}
							>
								<item.icon className='mr-2 h-4 w-4' />
								{item.label}
							</NavLink>
						))}
					</div>

					{/* Mobile Auth Section */}
					<div className='absolute bottom-0 w-full pt-4 pb-3 border-t border-gray-200 bg-gray-50'>
						<div className='px-4 flex items-center justify-between'>
							<SignedIn>
								<div className='flex items-center space-x-4'>
									<div className='px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium'>
										10 Credits
									</div>
									<UserButton
										appearance={{
											elements: {
												avatarBox: 'w-9 h-9',
											},
										}}
									/>
								</div>
							</SignedIn>
							<SignedOut>
								<SignInButton mode='modal'>
									<button className='inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>
										Sign In
									</button>
								</SignInButton>
							</SignedOut>
						</div>
					</div>
				</div>
			</nav>
		</>
	);
}
