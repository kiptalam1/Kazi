import { api } from '@/lib/api/client';
import type { Job } from '../types/get-job.types';

export async function getOneJob(id: string): Promise<Job> {
  const res = await api.get(`/jobs/${id}`);
  return res.data;
}
