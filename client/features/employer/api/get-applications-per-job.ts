import { api } from '@/lib/api/client';
import { JobApplicationsResponse } from '../types/get-applications-per-job.types';

export default async function getApplicationsPerJob(
  jobId: string,
): Promise<JobApplicationsResponse> {
  const res = await api.get(`/applications/jobs/${jobId}/applications`);
  return res.data;
}
