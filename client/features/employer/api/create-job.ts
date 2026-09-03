import { Job } from '@/features/jobs/types/get-job.types';
import { CreateJobBody } from '../types/create-job.types';
import { api } from '@/lib/api/client';

export default async function createJob(
  slug: string,
  body: CreateJobBody,
): Promise<{
  data: Omit<Job, 'company'>;
  message: string;
}> {
  const res = await api.post(`/companies/${slug}/jobs`, body);
  return res.data;
}
