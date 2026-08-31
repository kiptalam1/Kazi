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
