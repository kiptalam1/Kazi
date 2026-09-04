import { api } from '@/lib/api/client';
import { CreateJobBody } from '../types/create-job.types';
import { Job } from '@/features/jobs/types/get-job.types';

export default async function updateJob(
  jobId: string,
  data: CreateJobBody,
): Promise<{
  data: Omit<Job, 'company'>;
  message: string;
}> {
  const res = await api.patch(`/jobs/${jobId}`, data);
  return res.data;
}
