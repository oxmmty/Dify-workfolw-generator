'use client';

import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ManuscriptModal } from './manuscript-modal';

interface Manuscript {
	id: string;
	title: string;
	content: string;
	createdAt: Date;
}

interface ManuscriptListProps {
	manuscripts: Manuscript[];
}

export function ManuscriptList({ manuscripts }: ManuscriptListProps) {
	const [selectedManuscript, setSelectedManuscript] =
		useState<Manuscript | null>(null);

	return (
		<>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
				{manuscripts.map((manuscript) => (
					<div
						key={manuscript.id}
						className='bg-white p-4 rounded-lg border border-gray-200 hover:border-gray-300 cursor-pointer transition-all'
						onClick={() => setSelectedManuscript(manuscript)}
					>
						<h3 className='font-medium text-gray-900 truncate'>
							{manuscript.title}
						</h3>
						<p className='text-sm text-gray-500 mt-2'>
							Created {formatDistanceToNow(new Date(manuscript.createdAt))} ago
						</p>
					</div>
				))}
			</div>

			<ManuscriptModal
				isOpen={!!selectedManuscript}
				onClose={() => setSelectedManuscript(null)}
				manuscript={selectedManuscript}
			/>
		</>
	);
}
