import { useCandidate } from '../hooks/useCandidate';
import { useState } from 'react';
import UpdateLinks from './modals/UpdateLinks';
import { Edit2 } from 'lucide-react';
import Loader from '@/app/loading';
import QueryError from '@/app/error';

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
    return <Loader />;
  }

  if (isCandidateError) {
    return <QueryError error={candidateError} />;
  }

  return (
    <section className="border-border border p-4 sm:p-6 md:p-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-text-muted text-sm font-semibold tracking-wide uppercase">
          Links
        </h2>
        <button
          onClick={() => setOpenUpdateModal(true)}
          className="text-text-muted hover:bg-background-muted rounded-full p-2 text-sm duration-100"
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
              <p className="text-text-muted text-xs">{link.name}</p>

              {url ? (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm break-all hover:underline"
                >
                  {url}
                </a>
              ) : (
                <p className="text-text-muted text-sm">Empty</p>
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
