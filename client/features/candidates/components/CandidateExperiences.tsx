import Spinner from '@/components/ui/Spinner';
import { useCandidateExperiences } from '../hooks/useCandidateExperiences';
import { getApiErrorMessage } from '@/lib/api/error';
import formattedDate from '@/lib/utils/formattedDate';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import WorkExperienceModal from './modals/AddWorkExperience';
import type { Experience } from '../types/candidate.types';

export default function CandidateExperiences() {
  const { data, isPending, isError, error } = useCandidateExperiences();
  const [openExpModal, setOpenExpModal] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<Experience | undefined>()

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

  return (
    <section className="p-4 sm:p-6 border border-border-muted min-h-32 ">
      <div className="flex items-center justify-between  mb-4 ">
        <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wide ">
          Work Experience
        </h2>
        <button
          type="button"
          aria-label="add new experience"
          onClick={handleAdd}
          className="p-2 hover:bg-background-muted duration-100 rounded-full text-text-muted"
        >
          <Plus className="size-4" />
        </button>
      </div>
      <div className="divide-y divide-border-muted">
        {data.map((exp) => (
          <article
            key={exp.id}
            className="text-sm space-y-2 py-5 first:pt-0 last:pb-0"
          >
            <div className='flex items-start justify-between gap-4 '>
              <h3 className="font-semibold">
                {exp.jobTitle}
              </h3>
              <div className='flex items-start gap-1 text-sm text-text-muted'>
                <button
                  type='button'
                  aria-label={`Edit ${exp.jobTitle}`}
                  onClick={() => handleEdit(exp)}
                  className='p-3 hover:bg-accent-soft hover:text-accent-hover rounded-full duration-100'>
                  <Pencil className='size-3' />
                </button>
                <button
                  type='button'
                  aria-label={`Delete ${exp.jobTitle}`}
                  className='p-3 hover:bg-red-50 hover:text-danger rounded-full duration-100'>
                  <Trash2 className='size-3' />
                </button>


              </div>
            </div>
            <p className="text-text-secondary">{exp.companyName}</p>
            <div className="flex flex-wrap items-center gap-2">
              {exp.employmentType && (
                <span className="rounded-full bg-background-subtle p-1 px-1.5 text-text-secondary text-xs">
                  {exp.employmentType.trim().split('_').join(' ')}
                </span>
              )}

              {exp.location && (
                <span className="text-text-secondary">{exp.location}</span>
              )}
            </div>{' '}
            <p className="text-xs text-text-muted">
              {formattedDate(exp.startDate)} –{' '}
              {exp.isCurrent ? 'Present' : formattedDate(exp.endDate!)}
            </p>
            {exp.description && (
              <p className="pt-2 leading-6 text-text-secondary">
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
    </section>
  );
}
