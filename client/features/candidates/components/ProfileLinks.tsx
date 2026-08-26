import Spinner from '@/components/ui/Spinner';
import { useCandidate } from '../hooks/useCandidate';
import { getApiErrorMessage } from '@/lib/api/error';
import { useState } from 'react';
import UpdateLinks from './modals/UpdateLinks';
import { Edit2 } from 'lucide-react';

const profileLinks = [
  {
    name: 'GitHub',
    value: 'githubUrl',
  },
  {
    name: 'LinkedIn',
    value: 'linkedinUrl',
  },
  {
    name: 'Portfolio',
    value: 'portfolioUrl',
  },
] as const;

export const ProfileLinks = () => {
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const {
    data: candidate,
    isError: isCandidateError,
    error: candidateError,
    isPending: isCandidatePending,
  } = useCandidate();

  if (isCandidatePending) {
    return (
      <div className="flex items-center justify-center  min-h-[50vh] w-full">
        <Spinner />
      </div>
    );
  }

  if (isCandidateError) {
    return (
      <p className="text-center mx-auto p-6">
        {getApiErrorMessage(candidateError)}
      </p>
    );
  }

  return (
    <section className="border border-border-muted p-4 sm:p-6 md:p-8">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wide ">
          Links
        </h2>
        <button
          onClick={() => setOpenUpdateModal(true)}
          className="text-text-muted text-sm p-2 hover:bg-background-muted rounded-full duration-100"
          aria-label="update Professional links"
        >
          <Edit2 className="size-4" />
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {profileLinks.map((link) => {
          const url = candidate[link.value];
          return (
            <div key={link.value}>
              <p className="text-xs text-text-muted">{link.name}</p>

              {url ? (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:underline"
                >
                  {url}
                </a>
              ) : (
                <p className="text-sm text-text-muted">Empty</p>
              )}
            </div>
          );
        })}
      </div>
      {
        <UpdateLinks
          open={openUpdateModal}
          onClose={() => setOpenUpdateModal(false)}
          candidate={candidate}
        />
      }
    </section>
  );
};
