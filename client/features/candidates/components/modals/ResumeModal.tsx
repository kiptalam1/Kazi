import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import Modal from '@/components/ui/Modal';
import { FileText, Loader2, X } from 'lucide-react';
import { ChangeEvent, SyntheticEvent, useRef, useState } from 'react';
import useUploadCandidateResume from '../../hooks/useUploadCandidateResume';

type Props = {
  open: boolean;
  onClose: () => void;
};
export default function ResumeModal({ open, onClose }: Props) {
  const [file, setFile] = useState<File | undefined>();
  const [displayName, setDisplayName] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutate: uploadResume, isPending: isUploading } =
    useUploadCandidateResume();

  function handleAddResume(event: ChangeEvent<HTMLInputElement>) {
    setFile(event.target.files?.[0]);
  }

  const handleCloseModal = () => {
    onClose();
    setFile(undefined);
    setDisplayName('');
  };

  function handleSubmit(e: SyntheticEvent<HTMLFormElement, SubmitEvent>) {
    e.preventDefault();

    const fd = new FormData();

    if (file) {
      fd.append('resume', file);
    }

    const name = displayName.trim();
    if (name) {
      fd.append('displayName', name);
    }

    uploadResume(fd, {
      onSuccess: () => handleCloseModal,
    });
  }

  if (!open) return null;

  return (
    <Modal onClose={handleCloseModal}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="p-4 sm:p-6 bg-background space-y-4 rounded-sm shadow-lg w-full max-w-2xl animate-emerge"
      >
        <div className="flex items-center justify-between gap-2 text-text-secondary">
          <h2 className=" uppercase font-semibold text-sm tracking-wide">
            Upload Resume
          </h2>
          <button
            type="button"
            onClick={handleCloseModal}
            className="p-2 rounded-full hover:bg-background-subtle "
          >
            <X className="size-4" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <Label>Display Name (Optional)</Label>
            <Input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
          <input
            ref={inputRef}
            type="file"
            required
            accept=".pdf, .docx"
            onChange={handleAddResume}
            className="hidden"
          />

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="basic"
              onClick={() => inputRef.current?.click()}
              disabled={isUploading}
              className="flex gap-2 items-center text-sm w-fit hover:ring-2 hover:ring-border-strong text-text-secondary disabled:text-text-disabled"
            >
              {isUploading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <FileText className="size-4" />
              )}
              Pick a Resume
            </Button>
            {file && (
              <span className="text-sm text-accent max-w-35 truncate">
                {file.name}
              </span>
            )}
          </div>
          {file && (
            <Button
              type="submit"
              disabled={isUploading}
              className="disabled:opacity-60"
            >
              {isUploading ? 'Uploading...' : 'Upload Resume'}
            </Button>
          )}
        </form>
      </div>
    </Modal>
  );
}
