import { CompanyRole } from '@/features/common/types/common.types';

export type CreateCompanyBody = {
  name: string;
  description: string | null;
  website: string | null;
  industry: string | null;
  location: string | null;
  logoUrl: string | null;
};

export type CreatedCompany = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  website: string | null;
  industry: string | null;
  location: string | null;
  logoUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateCompanyResponse = {
  message: string;
  data: CreatedCompany;
};

type CompanyMember = {
  id: string;
  joinedAt: string;
  role: CompanyRole;
};

export type MyCompany = CreatedCompany & {
  companyMembers: CompanyMember[];
};
