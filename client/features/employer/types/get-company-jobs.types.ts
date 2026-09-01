import { Job } from "@/features/jobs/types/get-job.types";

export type CompanyJob = Omit<Job, 'company'>;

