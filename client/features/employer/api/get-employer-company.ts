import { api } from '@/lib/api/client';
import { MyCompany } from '../types/create-company.types';

export default async function getEmployerCompany(): Promise<MyCompany> {
  const res = await api.get('/companies/me');
  return res.data;
}
