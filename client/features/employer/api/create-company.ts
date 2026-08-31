import { api } from "@/lib/api/client";
import type { CreateCompanyBody, CreateCompanyResponse } from "../types/create-company.types";

export default async function createCompany(data: CreateCompanyBody): Promise<CreateCompanyResponse> {
  const res = await api.post('/companies/create', data);
  return res.data;
}
