import Spinner from '@/components/ui/Spinner';
import { useCandidateExperiences } from '../hooks/useCandidateExperiences';
import { getApiErrorMessage } from '@/lib/api/error';
import formattedDate from '@/lib/utils/formattedDate';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import WorkExperienceModal from './modals/WorkExperienceModal';
import type { Experience } from '../types/candidate.types';
import ConfirmModal from '@/components/ui/ConfirmModal';
import useDeleteCandidateExperience from '../hooks/useDeleteCandidateExperience';

export default function CandidateExperiences() {
  const { data, isPending, isError, error } = useCandidateExperiences();
  const [openExpModal, setOpenExpModal] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<
    Experience | undefined
  >();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { mutate: deleteExperience, isPending: isDeleting } =
    useDeleteCandidateExperience();

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

  const handleAdd = () => {
    setSelectedExperience(undefined);
    setOpenExpModal(true);
  };

  const handleEdit = (experience: Experience) => {
    setSelectedExperience(experience);
    setOpenExpModal(true);
  };

  const handleCloseModal = () => {
    setOpenExpModal(false);
    setSelectedExperience(undefined);
  };

  function handleDelete() {
    if (!selectedExperience) return;
    deleteExperience(selectedExperience.id, {
      onSuccess: () => {
        setOpenDeleteModal(false);
        setSelectedExperience(undefined);
      },
    });
  }

  return (
    <section className="border-border-muted min-h-32 border p-4 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-text-muted text-sm font-semibold tracking-wide uppercase">
          Work Experience
        </h2>
        <button
          type="button"
          aria-label="add new experience"
          onClick={handleAdd}
          className="hover:bg-background-muted text-text-muted rounded-full p-2 duration-100"
        >
          <Plus className="size-4" />
        </button>
      </div>
      <div className="divide-border-muted divide-y">
        {data.map((exp) => (
          <article
            key={exp.id}
            className="space-y-2 py-5 text-sm first:pt-0 last:pb-0"
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-semibold">{exp.jobTitle}</h3>
              <div className="text-text-muted flex items-start gap-1 text-sm">
                <button
                  type="button"
                  aria-label={`Edit ${exp.jobTitle}`}
                  onClick={() => handleEdit(exp)}
                  className="hover:bg-accent-soft hover:text-accent-hover rounded-full p-3 duration-100"
                >
                  <Pencil className="size-3" />
                </button>
                <button
                  type="button"
                  aria-label={`Delete ${exp.jobTitle}`}
                  onClick={() => {
                    setOpenDeleteModal(true);
                    setSelectedExperience(exp);
                  }}
                  className="hover:text-danger rounded-full p-3 duration-100 hover:bg-red-50"
                >
                  <Trash2 className="size-3" />
                </button>
              </div>
            </div>
            <p className="text-text-secondary">{exp.companyName}</p>
            <div className="flex flex-wrap items-center gap-2">
              {exp.employmentType && (
                <span className="bg-background-subtle text-text-secondary rounded-full p-1 px-1.5 text-xs">
                  {exp.employmentType.trim().split('_').join(' ')}
                </span>
              )}

              {exp.location && (
                <span className="text-text-secondary">{exp.location}</span>
              )}
            </div>{' '}
            <p className="text-text-muted text-xs">
              {formattedDate(exp.startDate)} –{' '}
              {exp.isCurrent ? 'Present' : formattedDate(exp.endDate!)}
            </p>
            {exp.description && (
              <p className="text-text-secondary pt-2 leading-6">
                {exp.description}
              </p>
            )}
          </article>
        ))}
      </div>
      {
        <WorkExperienceModal
          open={openExpModal}
          onClose={handleCloseModal}
          experience={selectedExperience}
        />
      }
      {
        <ConfirmModal
          title="Are you sure you want to delete this experience? "
          open={openDeleteModal}
          onClose={() => {
            setOpenDeleteModal(false);
            setSelectedExperience(undefined);
          }}
          onConfirm={handleDelete}
          isPending={isDeleting}
        />
      }
    </section>
  );
}
