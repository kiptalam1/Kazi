import { Education, } from "@/features/candidates/types/candidate.types";
import { ApplicationStatus, ExperienceLevel, JobStatus, } from "@/features/common/types/common.types";

type AppCandidate = {
  availability: boolean;
  bio: string | null;
  currentJobTitle: string | null;
  experienceLevel: ExperienceLevel;
  githubUrl: string | null;
  headline: string | null;
  id: string;
  linkedinUrl: string | null;
  location: string | null;
  portfolioUrl: string | null;
  salaryExpectation: number | null;
  skills: string[] | null;
  user: {
    avatar: string | null;
    email: string | null;
    firstName: string;
    lastName: string;
  };
  education: Education[] | null;
};

type AppJob = {
  id: string;
  title: string;
  status: JobStatus;
  companyId: string;
  experienceLevel: ExperienceLevel;
  createdAt: string;
};

export type SingleApplicationResponse = {
  id: string;
  job: AppJob;
  candidate: AppCandidate;
  coverLetter: string | null;
  status: ApplicationStatus;
  reviewedAt: string | null;
  createdAt: string;
  updatedAt: string;
}
