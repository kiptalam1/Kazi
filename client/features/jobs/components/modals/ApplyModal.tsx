import { ApplyForm } from '../ApplyForm';

type Props = {
  jobId: string;
  open: boolean;
  onClose: () => void;
};

export const ApplyModal = ({ jobId, open, onClose }: Props) => {
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="apply-modal-title"
      onClick={onClose}
      className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-black/40 p-4 backdrop-blur-xl"
    >
      <ApplyForm jobId={jobId} onClose={onClose} />
    </div>
  );
};
