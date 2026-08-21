import type { ApplicationStatus } from '@/features/common/types/common.types';

const withdrawableStatuses: ApplicationStatus[] = [
  'PENDING',
  'REVIEWING',
  'INTERVIEW',
  'SHORTLISTED',
];

export function canWithdrawApplication(status: ApplicationStatus) {
  return withdrawableStatuses.includes(status);
}
