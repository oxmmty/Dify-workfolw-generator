'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { createUser } from '@/app/actions/user.action';

export default function AfterSignUpHandler() {
	const router = useRouter();
	const { isLoaded, isSignedIn, user } = useUser();

	useEffect(() => {
		if (isLoaded && isSignedIn) {
			createUser()
				.then(() => {
					console.log('User created in database');
					router.push('/dashboard');
				})
				.catch((error) => {
					console.error('Error creating user in database:', error);
				});
		}
	}, [isLoaded, isSignedIn, router]);

	return null;
}
