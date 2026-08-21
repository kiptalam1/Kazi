import type { EmploymentType } from '@/features/common/types/common.types';

export type Experience = {
  employmentType: EmploymentType | null;
  id: string;
  jobTitle: string;
  companyName: string;
  location: string | null;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  description: string | null;
};
