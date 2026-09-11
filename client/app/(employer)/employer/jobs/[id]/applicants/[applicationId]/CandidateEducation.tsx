import Badge from '@/components/ui/Badge';
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
      <Badge>{edu.qualification.trim().split('_').join(' ')}</Badge>
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
