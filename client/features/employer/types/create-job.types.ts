import { ExperienceLevel, JobStatus } from "@/features/common/types/common.types";

export type CreateJobBody = {
  title: string;
  description: string | null;
  experienceLevel: ExperienceLevel;
  isRemote: boolean;
  status: JobStatus;
  location: string | null;
  salaryMin: number;
  salaryMax: number;
  currency: string | null;
}
