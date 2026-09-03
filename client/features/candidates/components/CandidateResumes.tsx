import Spinner from '@/components/ui/Spinner';
import { useCandidateResumes } from '../hooks/useCandidateResumes';
import { getApiErrorMessage } from '@/lib/api/error';
import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import ResumeModal from './modals/ResumeModal';
import ConfirmModal from '@/components/ui/ConfirmModal';
import useDeleteCandidateResume from '../hooks/useDeleteCandidateResume';
import type { Resume } from '../types/candidate.types';

export default function CandidateResumes() {
  const { data, isPending, isError, error } = useCandidateResumes();
  const [openResumeModal, setOpenResumeModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedResume, setSelectedResume] = useState<Resume | undefined>();
  const { mutate: deleteResume, isPending: isDeleting } =
    useDeleteCandidateResume();

  if (isPending) {
    return (
      <div className="flex min-h-[50vh] w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="mx-auto p-6 text-center">{getApiErrorMessage(error)}</p>
    );
  }

  const handleCloseModal = () => {
    setSelectedResume(undefined);
    setOpenDeleteModal(false);
  };

  function handleDeleteResume() {
    if (!selectedResume) return;
    deleteResume(selectedResume.id, {
      onSuccess: handleCloseModal,
    });
  }

  return (
    <section className="border-border-muted min-h-32 border p-4 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-text-muted text-sm font-semibold tracking-wide uppercase">
          Resumes
        </h2>
        <button
          type="button"
          aria-label="add new resume"
          onClick={() => setOpenResumeModal(true)}
          className="hover:bg-background-muted text-text-muted rounded-full p-2 duration-100"
        >
          <Plus className="size-4" />
        </button>
      </div>
      <div className="divide-border-muted divide-y">
        {data.map((resume) => (
          <article
            key={resume.id}
            className="space-y-3 py-5 text-sm first:pt-0 last:pb-0"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <h3 className="truncate font-medium">
                  {resume.displayName || resume.fileName}
                </h3>
                <p className="text-text-muted text-xs">
                  {resume.mimeType === 'application/pdf'
                    ? 'PDF'
                    : 'Word document'}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                <a
                  href={resume.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent-hover shrink-0 text-sm font-medium underline-offset-2 duration-150 hover:underline"
                >
                  Open
                </a>
                <button
                  type="button"
                  aria-label="Delete resume"
                  onClick={() => {
                    setSelectedResume(resume);
                    setOpenDeleteModal(true);
                  }}
                  className="hover:text-danger rounded-full p-3 duration-100 hover:bg-red-50"
                >
                  <Trash2 className="size-3" />
                </button>
              </div>
            </div>

            {resume.mimeType === 'application/pdf' && (
              <iframe
                src={resume.url}
                title={resume.displayName || resume.fileName || 'Resume'}
                className="border-border-muted hidden h-[60vh] w-full border sm:block"
              />
            )}
          </article>
        ))}
      </div>
      {
        <ResumeModal
          open={openResumeModal}
          onClose={() => setOpenResumeModal(false)}
        />
      }
      {
        <ConfirmModal
          title="Are you sure you want to delete this resume?"
          open={openDeleteModal}
          onClose={handleCloseModal}
          onConfirm={handleDeleteResume}
          isPending={isDeleting}
        />
      }
    </section>
  );
}
