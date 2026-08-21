import type { ApplicationStatus } from "@/features/common/types/common.types"

type ApplicationWithdrawn = {
  status: ApplicationStatus;
  id: string;
  jobId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ApplicationWithdrawnResponse = {
  message: string;
  data: ApplicationWithdrawn;
}
