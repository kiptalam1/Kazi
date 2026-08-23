import type { ApplicationStatus } from "@/features/common/types/common.types";

export type ApplyJobBody = {
  coverLetter?: string;
  resumeId?: string;
}

type ApplicationData = {
  id: string;
  status: ApplicationStatus;
  createdAt: string;
  updatedAt: string;
}

export type ApplicationCreatedResponse = {
  message: string;
  data: ApplicationData;
}


