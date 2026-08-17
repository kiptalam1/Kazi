import { ApplicationStatus, Company, JobStatus } from "@/features/common/types/common.types";

interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

type Job = {
  status: JobStatus;
  id: string;
  title: string;
  location: string | null;
  isRemote: boolean;
  company: Company;
};

type MyApplication = {
  status: ApplicationStatus;
  job: Job;
  id: string;
  createdAt: string;
  updatedAt: string;
  reviewedAt: string | null;
  coverLetter: string | null;
};

export type GetMyApplicationsResponse = {
  data: MyApplication[];
  meta: Meta;
}

export type AppsParams = {
  page?: number;
  limit?: number;
  status?: ApplicationStatus;
};
