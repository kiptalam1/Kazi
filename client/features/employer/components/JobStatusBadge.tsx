import type { JobStatus } from '@/features/jobs/types/get-job.types';
import { twMerge } from 'tailwind-merge';

type Props = {
  status: JobStatus;
  className?: string;
};

const labels: Record<JobStatus, string> = {
  DRAFT: 'Draft',
  PUBLISHED: 'Published',
  CLOSED: 'Closed',
  ARCHIVED: 'Archived',
};

const styles: Record<JobStatus, string> = {
  DRAFT: 'border-border-muted bg-background-subtle text-text-secondary',
  PUBLISHED: 'border-brand-primary/30 bg-selection text-brand-active',
  CLOSED: 'border-accent/30 bg-accent-soft text-accent-content',
  ARCHIVED: 'border-border-muted bg-background-muted text-text-muted',
};

export default function JobStatusBadge({ status, className }: Props) {
  return (
    <span
      className={twMerge(
        'inline-flex border px-2.5 py-1 text-xs font-medium',
        styles[status],
        className,
      )}
    >
      {labels[status]}
    </span>
  );
}
