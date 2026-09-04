import { Job } from '@/features/jobs/types/get-job.types';
import { api } from '@/lib/api/client';

export default async function deletejob(jobId: string): Promise<{
  message: string;
  data: Job;
}> {
  const res = await api.delete(`/jobs/${jobId}`);
  return res.data;
}
