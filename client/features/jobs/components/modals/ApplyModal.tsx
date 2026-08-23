import { ApplyForm } from "../ApplyForm";

type Props = {
  open: boolean;
  onClose: () => void;
}

export const ApplyModal = ({ open, onClose }: Props) => {

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="apply-modal-title"
      onClick={onClose}
      className="z-50 inset-0 fixed flex items-center justify-center bg-black/40 backdrop-blur-xl h-full w-full p-4"
    >
      <ApplyForm onClose={onClose} />
    </div>
  )
}
