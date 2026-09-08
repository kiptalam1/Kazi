import {
  ApplicationStatus,
  ExperienceLevel,
} from '@/features/common/types/common.types';

export type ApplicationCandidate = {
  id: string;
  headline: string;
  currentJobTitle: string;
  experienceLevel: ExperienceLevel;
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
};

export type JobApplication = {
  id: string;
  status: ApplicationStatus;
  coverLetter: string;
  reviewedAt: string | null;
  createdAt: string;
  updatedAt: string;
  candidate: ApplicationCandidate;
};

export type JobApplicationsResponse = {
  data: JobApplication[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};
