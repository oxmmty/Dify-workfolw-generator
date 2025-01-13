import FileUpload from '@/components/dashboard/file-upload';
import UsageInfo from '@/components/dashboard/usage-info';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
	const { userId } = await auth();

	if (!userId) {
		redirect('/sign-in');
	}

	return (
		<div className='max-w-6xl mx-auto mt-6 px-4 py-8'>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
				<div className='bg-card rounded-lg shadow-lg p-6'>
					<h2 className='text-2xl font-semibold mb-4'>
						Generate New Manuscript
					</h2>
					<FileUpload />
					<UsageInfo userId={userId} />
				</div>
				<div className='bg-card rounded-lg shadow-lg p-6'>
					<h2 className='text-2xl font-semibold mb-4'>Your Manuscripts</h2>
					<p className='text-sm text-slate-500 font-mono'>
						You havent generated any manuscripts yet.
					</p>
				</div>
			</div>
		</div>
	);
}
