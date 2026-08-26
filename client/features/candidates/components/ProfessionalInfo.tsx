import Spinner from '@/components/ui/Spinner';
import { useCandidate } from '../hooks/useCandidate';
import { getApiErrorMessage } from '@/lib/api/error';
import UpdateProfInfoModal from './modals/UpdateProfInfoModal';
import { useState } from 'react';
import { Edit2 } from 'lucide-react';

export const ProfessionalInfo = () => {
  const {
    data: candidate,
    isError: isCandidateError,
    error: candidateError,
    isPending: isCandidatePending,
  } = useCandidate();
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  if (isCandidatePending) {
    return (
      <div className="flex items-center justify-center  min-h-[50vh] w-full ">
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
    <section className="relative border border-border-muted p-4 sm:p-6 md:p-8">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wide ">
          Professional Information
        </h2>
        <button
          onClick={() => setOpenUpdateModal(true)}
          className="text-text-muted text-sm p-2 hover:bg-background-muted rounded-full duration-100"
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
            <p className="mt-1 text-sm p-1 bg-background-muted w-fit text-text-secondary">
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
                    className="rounded-full bg-background-muted px-2 py-1 text-sm"
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
