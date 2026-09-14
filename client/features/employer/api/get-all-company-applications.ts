import { api } from '@/lib/api/client';
import { CompanyApplication } from '../types/get-all-company-applications.types';

export default async function getAllCompanyApplications(): Promise<
  CompanyApplication[]
> {
  const res = await api.get('/applications/employer/all');
  return res.data;
}
