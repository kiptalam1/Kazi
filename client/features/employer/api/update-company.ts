import { api } from '@/lib/api/client';
import type {
  CreateCompanyBody,
  CreateCompanyResponse,
} from '../types/create-company.types';

export default async function updateCompany(
  id: string,
  data: CreateCompanyBody,
): Promise<CreateCompanyResponse> {
  const res = await api.patch(`/companies/update/${id}`, data);
  return res.data;
}
