import { api } from '@/lib/api/client';
import { CompanyJob } from '../types/get-company-jobs.types';

export default async function getCompanyJobs(): Promise<CompanyJob[]> {
  const res = await api.get('/companies/me/jobs');
  return res.data;
}
