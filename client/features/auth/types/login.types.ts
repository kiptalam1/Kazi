export type LoginBody = {
  email: string;
  password: string;
};

export type UserRole =
  'CANDIDATE' | 'COMPANY_ADMIN' | 'PLATFORM_ADMIN' | 'RECRUITER';

export type ExperienceLevel =
  'INTERN' | 'APPRENTICE' | 'JUNIOR' | 'MID' | 'SENIOR' | 'LEAD';

export interface Candidate {
  id: string;
  userId: string;
  headline: string | null;
  bio: string | null;
  location: string | null;
  skills: string[];
  experienceLevel: ExperienceLevel | null;
  currentJobTitle: string | null;
  salaryExpectation: number | null;
  availability: string | null;
  linkedinUrl: string | null;
  githubUrl: string | null;
  portfolioUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: UserRole[];
  avatar: string | null;
  phone: string | null;
  isActive: boolean;
  lastLoginAt: string | null;
  candidate: Candidate | null;
}

export interface LoginResponse {
  message: string;
  data: User;
}
