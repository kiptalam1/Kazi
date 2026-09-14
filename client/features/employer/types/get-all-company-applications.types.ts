import {
  ApplicationStatus,
  ExperienceLevel,
  JobStatus,
} from '@/features/common/types/common.types';

export type CompanyApplication = {
  id: string;
  status: ApplicationStatus;
  createdAt: string;
  updatedAt: string;

  job: {
    id: string;
    title: string;
    companyId: string;
    status: JobStatus;
  };

  candidate: {
    id: string;
    experienceLevel: ExperienceLevel | null;

    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      avatar: {
        url: string;
      } | null;
    };
  };
};
