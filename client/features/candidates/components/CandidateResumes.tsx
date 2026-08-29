import Spinner from '@/components/ui/Spinner';
import { useCandidateResumes } from '../hooks/useCandidateResumes';
import { getApiErrorMessage } from '@/lib/api/error';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import ResumeModal from './modals/ResumeModal';

export default function CandidateResumes() {
  const { data, isPending, isError, error } = useCandidateResumes();
  const [openResumeModal, setOpenResumeModal] = useState(false);

  if (isPending) {
    return (
      <div className="flex items-center justify-center  min-h-[50vh] w-full ">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-center mx-auto p-6">{getApiErrorMessage(error)}</p>
    );
  }

  return (
    <section className="p-4 sm:p-6 border border-border-muted min-h-32 ">
      <div className="flex items-center justify-between  mb-4">
        <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wide">
          Resumes
        </h2>
        <button
          type="button"
          aria-label="add new resume"
          onClick={() => setOpenResumeModal(true)}
          className="p-2 hover:bg-background-muted duration-100 rounded-full text-text-muted"
        >
          <Plus className="size-4" />
        </button>
      </div>
      <div className="divide-y divide-border-muted">
        {data.map((resume) => (
          <article
            key={resume.id}
            className="text-sm space-y-3 py-5 first:pt-0 last:pb-0"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="font-medium truncate">
                  {resume.displayName || resume.fileName}
                </h3>
                <p className="text-xs text-text-muted">
                  {resume.mimeType === 'application/pdf'
                    ? 'PDF'
                    : 'Word document'}
                </p>
              </div>

              <a
                href={resume.url}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-sm font-medium text-accent hover:text-accent-hover hover:underline underline-offset-2 duration-150"
              >
                Open
              </a>
            </div>

            {resume.mimeType === 'application/pdf' && (
              <iframe
                src={resume.url}
                title={resume.displayName || resume.fileName || 'Resume'}
                className="hidden sm:block h-[60vh] w-full border border-border-muted"
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
    </section>
  );
}
