import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../generated/prisma/enums.js';

export class UserLoginResponse {
  id!: string;
  email!: string;
  firstName!: string;
  lastName!: string;
  @ApiProperty({ enum: Role, isArray: true })
  roles!: Role[];
  avatar!: string | null;
  phone!: string | null;
  isActive!: boolean;
  lastLoginAt!: Date | null;
}

export class UserRegisteredResponse {
  id!: string;
  email!: string;
  firstName!: string;
  lastName!: string;
  @ApiProperty({ enum: Role, isArray: true })
  roles!: Role[];
  avatar!: string | null;
  phone!: string | null;
  isActive!: boolean;
  lastLoginAt!: Date | null;
  emailVerified!: boolean;
  verificationToken!: string | null;
  verificationTokenExpiresAt!: Date | null;
  refreshTokenHash!: string | null;
  createdAt!: Date;
  updatedAt!: Date;
}
