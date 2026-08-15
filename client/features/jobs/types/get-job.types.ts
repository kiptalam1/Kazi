export type JobStatus = 'DRAFT' | 'PUBLISHED' | 'CLOSED' | 'ARCHIVED';

export interface JobCompany {
  id: string;
  name: string;
  logoUrl: string | null;
}

type ExperienceLevel =
  'INTERN' | 'APPRENTICE' | 'JUNIOR' | 'MID' | 'SENIOR' | 'LEAD';

export interface Job {
  id: string;
  title: string;
  description: string;
  experienceLevel: ExperienceLevel;
  location: string | null;
  salaryMin: number | null;
  salaryMax: number | null;
  currency: string | null;
  isRemote: boolean;
  status: JobStatus;
  companyId: string;
  createdById: string;
  createdAt: string;
  updatedAt: string;
  company: JobCompany;
}
