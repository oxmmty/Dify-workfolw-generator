'use client';

import React, { useState } from 'react';
import { Search, Users, AlertCircle, X, Check } from 'lucide-react';

interface User {
	id: number;
	name: string;
	email: string;
	code: string;
	avatar: string;
}

const AdminDashboard = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [notification, setNotification] = useState('');
	// Manage separate code inputs for each user
	const [codeInputs, setCodeInputs] = useState<{ [key: number]: string }>({});
	const [isLoading, setIsLoading] = useState<{ [key: number]: boolean }>({});

	// Mock data with avatars
	const users: User[] = [
		{
			id: 1,
			name: 'John Doe',
			email: 'john@example.com',
			code: '',
			avatar: 'JD',
		},
		{
			id: 2,
			name: 'Jane Smith',
			email: 'jane@example.com',
			code: 'ABC123',
			avatar: 'JS',
		},
		{
			id: 3,
			name: 'Mike Johnson',
			email: 'mike@example.com',
			code: '',
			avatar: 'MJ',
		},
	];

	const assignCode = async (userId: number) => {
		try {
			setIsLoading((prev) => ({ ...prev, [userId]: true }));
			// Mock API call
			await new Promise((resolve) => setTimeout(resolve, 1000));

			setNotification(`Code ${codeInputs[userId]} assigned successfully!`);
			// Clear only the specific user's input
			setCodeInputs((prev) => ({ ...prev, [userId]: '' }));
			setTimeout(() => setNotification(''), 3000);
		} catch (error) {
			console.error('Error assigning code:', error);
		} finally {
			setIsLoading((prev) => ({ ...prev, [userId]: false }));
		}
	};

	const handleInputChange = (userId: number, value: string) => {
		setCodeInputs((prev) => ({ ...prev, [userId]: value }));
	};

	const filteredUsers = users.filter(
		(user) =>
			user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.email.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className='min-h-screen bg-gray-50'>
			{/* Top Navigation */}
			<nav className='bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='flex justify-between h-16 items-center'>
						<div className='flex items-center space-x-4'>
							<div className='bg-blue-600 p-2 rounded-lg'>
								<Users className='h-6 w-6 text-white' />
							</div>
							<h1 className='text-xl font-semibold text-gray-900'>
								User Management Portal
							</h1>
						</div>
					</div>
				</div>
			</nav>

			{/* Main Content */}
			<main className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
				<div className='px-4 py-6 sm:px-0'>
					<div className='bg-white rounded-xl shadow-lg'>
						<div className='p-6'>
							{/* Header and Search */}
							<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6'>
								<h2 className='text-lg font-semibold text-gray-900 mb-4 sm:mb-0'>
									Manage User Codes
								</h2>
								<div className='relative max-w-xs sm:max-w-md w-full'>
									<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
										<Search className='h-5 w-5 text-gray-400' />
									</div>
									<input
										type='text'
										className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out'
										placeholder='Search users...'
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
									/>
									{searchTerm && (
										<button
											onClick={() => setSearchTerm('')}
											className='absolute inset-y-0 right-0 pr-3 flex items-center'
										>
											<X className='h-4 w-4 text-gray-400 hover:text-gray-600' />
										</button>
									)}
								</div>
							</div>

							{/* Notification */}
							{notification && (
								<div className='mb-6 bg-green-50 p-4 rounded-lg border border-green-200 flex items-center justify-between'>
									<div className='flex items-center'>
										<Check className='h-5 w-5 text-green-500' />
										<span className='ml-2 text-green-700'>{notification}</span>
									</div>
									<button
										onClick={() => setNotification('')}
										className='text-green-500 hover:text-green-600'
									>
										<X className='h-4 w-4' />
									</button>
								</div>
							)}

							{/* Users Table */}
							<div className='overflow-x-auto rounded-lg border border-gray-200'>
								<table className='min-w-full divide-y divide-gray-200'>
									<thead>
										<tr className='bg-gray-50'>
											<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-4'>
												User
											</th>
											<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
												Email
											</th>
											<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
												Current Code
											</th>
											<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
												Actions
											</th>
										</tr>
									</thead>
									<tbody className='bg-white divide-y divide-gray-200'>
										{filteredUsers.map((user) => (
											<tr
												key={user.id}
												className='hover:bg-gray-50 transition duration-150'
											>
												<td className='px-6 py-4 whitespace-nowrap'>
													<div className='flex items-center'>
														<div className='h-10 w-10 flex-shrink-0'>
															<div className='h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center'>
																<span className='text-blue-600 font-medium'>
																	{user.avatar}
																</span>
															</div>
														</div>
														<div className='ml-4'>
															<div className='text-sm font-medium text-gray-900'>
																{user.name}
															</div>
														</div>
													</div>
												</td>
												<td className='px-6 py-4 whitespace-nowrap'>
													<div className='text-sm text-gray-500'>
														{user.email}
													</div>
												</td>
												<td className='px-6 py-4 whitespace-nowrap'>
													{user.code ? (
														<span className='px-2 py-1 text-sm rounded-full bg-blue-100 text-blue-800'>
															{user.code}
														</span>
													) : (
														<span className='text-sm text-gray-400'>
															Not assigned
														</span>
													)}
												</td>
												<td className='px-6 py-4 whitespace-nowrap'>
													<div className='flex items-center space-x-2'>
														<input
															type='text'
															className='block w-32 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150'
															placeholder='Enter code'
															value={codeInputs[user.id] || ''}
															onChange={(e) =>
																handleInputChange(user.id, e.target.value)
															}
														/>
														<button
															onClick={() => assignCode(user.id)}
															disabled={
																!codeInputs[user.id]?.trim() ||
																isLoading[user.id]
															}
															className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150'
														>
															{isLoading[user.id] ? (
																<span className='inline-flex items-center'>
																	<svg
																		className='animate-spin -ml-1 mr-2 h-4 w-4 text-white'
																		xmlns='http://www.w3.org/2000/svg'
																		fill='none'
																		viewBox='0 0 24 24'
																	>
																		<circle
																			className='opacity-25'
																			cx='12'
																			cy='12'
																			r='10'
																			stroke='currentColor'
																			strokeWidth='4'
																		></circle>
																		<path
																			className='opacity-75'
																			fill='currentColor'
																			d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
																		></path>
																	</svg>
																	Assigning...
																</span>
															) : (
																'Assign'
															)}
														</button>
													</div>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};

export default AdminDashboard;
