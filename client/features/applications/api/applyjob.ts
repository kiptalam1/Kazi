import { api } from "@/lib/api/client";
import type { ApplicationCreatedResponse, ApplyJobBody } from "../types/apply-job.types";

export default async function applyjob(
  jobId: string,
  data: ApplyJobBody
): Promise<ApplicationCreatedResponse> {
  const res = await api.post(`/applications/job/${jobId}`, data);
  return res.data;
}
