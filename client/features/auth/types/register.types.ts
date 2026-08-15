export type RegisterBody = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
};

export type UserRole =
  'CANDIDATE' | 'COMPANY_ADMIN' | 'PLATFORM_ADMIN' | 'RECRUITER';

export interface RegisterUser {
  roles: UserRole[];
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
  phone: string | null;
  isActive: boolean;
  lastLoginAt: string | null;
  emailVerified: boolean;
  verificationToken: string | null;
  verificationTokenExpiresAt: string | null;
  refreshTokenHash: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterResponse {
  message: string;
  data: RegisterUser;
}
