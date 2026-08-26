import Spinner from '@/components/ui/Spinner';
import { useCandidateEducation } from '../hooks/useCandidateEducation';
import { getApiErrorMessage } from '@/lib/api/error';
import formattedDate from '@/lib/utils/formattedDate';

export default function CandidateEducation() {
  const { data, isPending, isError, error } = useCandidateEducation();

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
    <section className="p-4 sm:p-6 border border-border-muted  ">
      <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-4">
        Education
      </h2>
      <div className="divide-y divide-border-muted">
        {data.map((edu) => (
          <article
            key={edu.id}
            className="text-sm space-y-2 py-5 first:pt-0 last:pb-0"
          >
            <h3 className="font-semibold">{edu.schoolName}</h3>
            {edu.fieldOfStudy && (
              <p className="text-text-secondary">{edu.fieldOfStudy}</p>
            )}
            <p className="text-text-secondary text-xs bg-background-subtle w-fit py-1 px-1.5 rounded-full">
              {edu.qualification.trim().split('_').join(' ')}
            </p>
            {(edu.city || edu.country) && (
              <p className="text-text-secondary">
                {edu.city}
                {edu.city && edu.country && ', '}
                {edu.country}
              </p>
            )}
            <p className="text-xs text-text-muted">
              {formattedDate(edu.startDate)} –{' '}
              {edu.endDate ? formattedDate(edu.endDate) : 'Present'}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
