import { ApplicationStatus } from '@/features/common/types/common.types';

export type UpdateApplicationBody = {
  status?: ApplicationStatus;
  employerNotes?: string;
};

type UpdatedApplication = {
  id: string;
  status: ApplicationStatus;
  employerNotes: string | null;
  reviewedAt: Date | null;
  updatedAt: Date;
};

export type ApplicationStatusUpdatedResponse = {
  message: string;
  data: UpdatedApplication;
};
