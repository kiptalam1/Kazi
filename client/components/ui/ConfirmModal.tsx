import Button from './Button';
import Modal from './Modal';

type Props = {
  title: string;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isPending?: boolean;
};
export default function ConfirmModal({
  title,
  open,
  onClose,
  onConfirm,
  isPending,
}: Props) {
  if (!open) return null;

  return (
    <Modal onClose={onClose}>
      <div className="w-full max-w-md bg-background p-6 space-y-4 text-sm ">
        <h2 className="text-base text-text-secondary text-wrap">{title}</h2>
        <div className="flex items-center justify-between gap-4 ">
          <Button type="button" variant="basic" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" onClick={onConfirm}>
            {isPending ? 'Confirming' : 'Confirm'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
