import { useCandidate } from '../hooks/useCandidate';
import UpdateProfInfoModal from './modals/UpdateProfInfoModal';
import { useState } from 'react';
import { Edit2 } from 'lucide-react';
import Loader from '@/app/loading';
import QueryError from '@/app/error';

export const ProfessionalInfo = () => {
  const {
    data: candidate,
    isError: isCandidateError,
    error: candidateError,
    isPending: isCandidatePending,
  } = useCandidate();
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  if (isCandidatePending) {
    return <Loader />;
  }

  if (isCandidateError) {
    return <QueryError error={candidateError} />;
  }

  return (
    <section className="border-border relative border p-4 sm:p-6 md:p-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-text-muted text-sm font-semibold tracking-wide uppercase">
          Professional Information
        </h2>
        <button
          onClick={() => setOpenUpdateModal(true)}
          className="text-text-muted hover:bg-background-muted rounded-full p-2 text-sm duration-100"
          aria-label="update Professional information"
        >
          <Edit2 className="size-4" />
        </button>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <div>
            <p className="text-text-muted text-xs">Headline</p>
            <p>{candidate.headline ?? 'No headline'}</p>
          </div>
          <div>
            <p className="text-text-muted text-xs whitespace-pre-wrap">Bio</p>
            <p className="mt-1">{candidate.bio ?? 'No bio'}</p>
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <p className="text-text-muted text-xs">Current Job Title</p>
            <p className="mt-1">
              {candidate.currentJobTitle?.trim() ?? 'No job title'}
            </p>
          </div>
          <div>
            <p className="text-text-muted text-xs">Location</p>
            <p className="mt-1">{candidate.location ?? 'No location'}</p>
          </div>
          <div>
            <p className="text-text-muted text-xs">Experience Level</p>
            <p className="bg-background-muted text-text-secondary mt-1 w-fit p-1 text-sm">
              {candidate.experienceLevel ?? 'Add experience level'}
            </p>
          </div>
          <div>
            <p className="text-text-muted text-xs">Availability</p>
            <p className="mt-1">
              {candidate.availability ? 'Available' : 'Not Available'}
            </p>
          </div>
          <div>
            <p className="text-text-muted text-xs">Skills</p>

            <div className="mt-2 flex flex-wrap gap-2">
              {candidate.skills.length > 0 ? (
                [
                  ...new Set(candidate.skills.filter((skill) => skill.trim())),
                ].map((skill) => (
                  <span
                    key={skill}
                    className="bg-background-muted rounded-full px-2 py-1 text-sm"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p>No skills</p>
              )}
            </div>
          </div>
        </div>
      </div>
      {
        <UpdateProfInfoModal
          open={openUpdateModal}
          onClose={() => setOpenUpdateModal(false)}
          candidate={candidate}
        />
      }
    </section>
  );
};
