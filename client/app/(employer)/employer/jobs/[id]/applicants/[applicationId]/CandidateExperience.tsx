import Badge from '@/components/ui/Badge';
import { Experience } from '@/features/candidates/types/candidate.types';
import formattedDate from '@/lib/utils/formattedDate';

export default function CandidateExperience({ exp }: { exp: Experience }) {
  return (
    <article
      key={exp.id}
      className="space-y-2 py-2 text-sm first:pt-0 last:pb-0"
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-semibold">{exp.jobTitle}</h3>
      </div>
      <p className="text-text-secondary">{exp.companyName}</p>
      <div className="flex flex-wrap items-center gap-2">
        {exp.employmentType && (
          <Badge>{exp.employmentType.trim().split('_').join(' ')}</Badge>
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
        <p className="text-text-secondary pt-2 leading-6">{exp.description}</p>
      )}
    </article>
  );
}
