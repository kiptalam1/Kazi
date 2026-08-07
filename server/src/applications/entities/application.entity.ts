import type { ApplicationStatus } from '../../generated/prisma/enums.js';

export class Application {
  id!: string;
  candidateId!: string;
  jobId!: string;
  resumeId!: string | null;
  coverLetter!: string | null;
  status!: ApplicationStatus;
  createdAt!: Date;
  updatedAt!: Date;
}
