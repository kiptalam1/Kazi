import { ApiProperty } from '@nestjs/swagger';
import { ExperienceLevel, JobStatus } from '../../generated/prisma/enums.js';

export class Job {
  id!: string;
  createdBy!: string;
  title!: string;
  description!: string;
  companyId!: string;

  @ApiProperty({
    enumName: 'ExperienceLevel',
    enum: ExperienceLevel,
  })
  experienceLevel!: ExperienceLevel;

  location?: string;
  salaryMin?: number;
  salaryMax?: number;
  currency?: string;
  isRemote!: boolean;

  @ApiProperty({
    enum: JobStatus,
    enumName: 'JobStatus',
  })
  status!: JobStatus;

  createdAt!: Date;
  updatedAt!: Date;
}
