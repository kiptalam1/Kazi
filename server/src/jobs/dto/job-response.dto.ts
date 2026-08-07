import { ExperienceLevel, JobStatus } from '../../generated/prisma/enums.js';

export class JobResponseDto {
  id!: string;
  title!: string;
  description!: string;
  experienceLevel!: ExperienceLevel;
  location!: string | null;
  salaryMin!: number | null;
  salaryMax!: number | null;
  currency!: string | null;
  isRemote!: boolean;
  status!: JobStatus;
  companyId!: string;
  createdById!: string;
  createdAt!: Date;
  updatedAt!: Date;
  company!: {
    id: string;
    name: string;
    logoUrl: string | null;
    slug: string;
  };
}
