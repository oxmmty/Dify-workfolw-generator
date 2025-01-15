import { ManuscriptOutput } from '../dashboard/manuscript-output';
import { Modal } from './modal';

interface ManuscriptModalProps {
	isOpen: boolean;
	onClose: () => void;
	manuscript: {
		title: string;
		content: string;
	} | null;
}

export function ManuscriptModal({
	isOpen,
	onClose,
	manuscript,
}: ManuscriptModalProps) {
	if (!manuscript) return null;

	return (
		<Modal isOpen={isOpen} onClose={onClose} title={manuscript.title}>
			<ManuscriptOutput manuscript={manuscript.content} />
		</Modal>
	);
}
