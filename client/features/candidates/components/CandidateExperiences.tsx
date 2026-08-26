import Spinner from '@/components/ui/Spinner';
import { useCandidateExperiences } from '../hooks/useCandidateExperiences';
import { getApiErrorMessage } from '@/lib/api/error';
import formattedDate from '@/lib/utils/formattedDate';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import AddWorkExperience from './modals/AddWorkExperience';

export default function CandidateExperiences() {
  const { data, isPending, isError, error } = useCandidateExperiences();
  const [openAddModal, setOpenAddModal] = useState(false);

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
      <div className='flex items-center justify-between  mb-4 '>
        <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wide ">
          Work Experience
        </h2>
        <button
          type='button'
          aria-label='add new experience'
          onClick={() => setOpenAddModal(true)}
          className='p-2 hover:bg-background-muted duration-100 rounded-full text-text-muted'
        >
          <Plus className='size-4' />
        </button>
      </div>
      <div className="divide-y divide-border-muted">
        {data.map((exp) => (
          <article
            key={exp.id}
            className="text-sm space-y-2 py-5 first:pt-0 last:pb-0"
          >
            <h3 className="font-semibold">{exp.jobTitle}</h3>
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
        <AddWorkExperience
          open={openAddModal}
          onClose={() => setOpenAddModal(false)}
        />
      }
    </section>
  );
}
