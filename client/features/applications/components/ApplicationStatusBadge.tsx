import type { ApplicationStatus } from '@/features/common/types/common.types';
import { twMerge } from 'tailwind-merge';

type Props = {
  status: ApplicationStatus;
  className?: string;
};

const statusLabels: Record<ApplicationStatus, string> = {
  PENDING: 'Pending',
  REVIEWING: 'Under review',
  WITHDRAWN: 'Withdrawn',
  INTERVIEW: 'Interview',
  SHORTLISTED: 'Shortlisted',
  HIRED: 'Hired',
  OFFERED: 'Offer received',
  REJECTED: 'Not selected',
};

const statusStyles: Record<ApplicationStatus, string> = {
  PENDING: 'border-border-muted bg-background-subtle text-text-secondary',
  REVIEWING: 'border-info/30 bg-info/10 text-info',
  WITHDRAWN: 'border-border-muted bg-background-muted text-text-muted',
  INTERVIEW: 'border-brand-primary/30 bg-selection text-brand-active',
  SHORTLISTED: 'border-accent/30 bg-accent-soft text-accent-content',
  HIRED: 'border-success/30 bg-success/10 text-success',
  OFFERED: 'border-success/30 bg-success/10 text-success',
  REJECTED: 'border-danger/30 bg-danger/10 text-danger',
};

export default function ApplicationStatusBadge({ status, className }: Props) {
  return (
    <span
      className={twMerge(
        'inline-flex border px-2.5 py-1 text-xs font-medium',
        statusStyles[status],
        className,
      )}
    >
      {statusLabels[status]}
    </span>
  );
}

export function getApplicationStatusLabel(status: ApplicationStatus) {
  return statusLabels[status];
}
