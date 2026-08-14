type Status =
  | 'PENDING'
  | 'REVIEWING'
  | 'WITHDRAWN'
  | 'INTERVIEW'
  | 'SHORTLISTED'
  | 'HIRED'
  | 'OFFERED'
  | 'REJECTED';

type ExperienceLevel = 'INTERN' | 'APPRENTICE' | 'JUNIOR' | 'MID' | 'SENIOR' | 'LEAD';

export type JobsParams = {
  page?: number;
  limit?: number;
  search?: string;
  status?: Status;
  isRemote?: boolean;
  sortBy?: 'createdAt' | 'salaryMax';
  order?: 'desc' | 'asc';
  experienceLevel?: ExperienceLevel;
};

export interface JobCompany {
  id: string;
  name: string;
  logoUrl: string | null;
  slug: string;
}

export type JobStatus = 'DRAFT' | 'PUBLISHED' | 'CLOSED' | 'ARCHIVED';

export interface JobResponse {
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

export interface JobsMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface GetJobsResponse {
  data: JobResponse[];
  meta: JobsMeta;
}
