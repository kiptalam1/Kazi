import { Education } from '@/features/candidates/types/candidate.types';
import formattedDate from '@/lib/utils/formattedDate';

export default function CandidateEducation({ edu }: { edu: Education }) {
  return (
    <article
      key={edu.id}
      className="space-y-2 py-2 text-sm first:pt-0 last:pb-0"
    >
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-semibold">{edu.schoolName}</h3>
      </div>

      {edu.fieldOfStudy && (
        <p className="text-text-secondary">{edu.fieldOfStudy}</p>
      )}
      <p className="text-text-secondary bg-background-subtle w-fit rounded-full px-1.5 py-1 text-xs">
        {edu.qualification.trim().split('_').join(' ')}
      </p>
      {(edu.city || edu.country) && (
        <p className="text-text-secondary">
          {edu.city}
          {edu.city && edu.country && ', '}
          {edu.country}
        </p>
      )}
      <p className="text-text-muted text-xs">
        {formattedDate(edu.startDate)} –{' '}
        {edu.endDate ? formattedDate(edu.endDate) : 'Present'}
      </p>
    </article>
  );
}
