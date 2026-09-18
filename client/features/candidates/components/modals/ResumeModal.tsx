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
    if (inputRef.current) {
      inputRef.current.value = '';
    }
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
      onSuccess: handleCloseModal,
    });
  }

  if (!open) return null;

  return (
    <Modal onClose={handleCloseModal}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-background animate-emerge w-full max-w-2xl space-y-4 rounded-sm p-4 shadow-lg sm:p-6"
      >
        <div className="text-text-secondary flex items-center justify-between gap-2">
          <h2 className="text-sm font-semibold tracking-wide uppercase">
            Upload Resume
          </h2>
          <button
            type="button"
            onClick={handleCloseModal}
            className="hover:bg-background-subtle rounded-full p-2"
          >
            <X className="size-4" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <Label htmlFor="resume-display-name">Display name (optional)</Label>
            <Input
              id="resume-display-name"
              type="text"
              name="displayName"
              placeholder="e.g. Frontend Developer Resume"
              maxLength={100}
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
              className="hover:ring-border-strong text-text-secondary disabled:text-text-disabled flex w-fit shrink-0 items-center gap-2 text-sm hover:ring-2"
            >
              {isUploading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <FileText className="size-4" />
              )}
              Pick a Resume
            </Button>
            {file && (
              <span className="text-accent min-w-0 flex-1 truncate text-sm">
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
