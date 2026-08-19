import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../generated/prisma/enums.js';

export class UserLoginResponse {
  id!: string;
  email!: string;
  firstName!: string;
  lastName!: string;
  @ApiProperty({ enum: Role, isArray: true })
  roles!: Role[];
  avatarId?: string | null;
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

export class UserDto {
  id!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  avatar!: string | null;
  phone!: string | null;
  emailVerified!: boolean;
  isActive!: boolean;
  @ApiProperty({ enum: Role, isArray: true })
  roles!: Role[];
  lastLoginAt!: Date | null;
  createdAt!: Date;
  updatedAt!: Date;
}
