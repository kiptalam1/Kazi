import { ApiProperty } from '@nestjs/swagger';
import {
  CompanyRole,
  ExperienceLevel,
  JobStatus,
} from '../../generated/prisma/enums.js';
import { UserDto } from '../../users/dto/user-response.dto.js';
import { Meta } from '../../common/dto/meta.dto.js';

export class CompanyDto {
  id!: string;
  name!: string;
  slug!: string;
  description!: string | null;
  website!: string | null;
  industry!: string | null;
  location!: string | null;
  logoUrl!: string | null;
  createdAt!: Date;
  updatedAt!: Date;
}

export class CompanyMemberDto {
  id!: string;
  userId!: string;
  user!: UserDto;
  companyId!: string;
  @ApiProperty({
    enum: CompanyRole,
    enumName: 'CompanyRole',
  })
  role!: CompanyRole;
  joinedAt!: Date;
}
export class companyDetailsDto extends CompanyDto {
  @ApiProperty({
    type: () => CompanyMemberDto,
    isArray: true,
  })
  companyMembers!: CompanyMemberDto[];
}

export class GetAllCompaniesResponseDto {
  @ApiProperty({ type: [CompanyDto] })
  data!: CompanyDto[];

  @ApiProperty({ type: Meta })
  meta!: Meta;
}

class CompanyMember {
  id!: string;
  @ApiProperty({ enum: CompanyRole })
  role!: CompanyRole;
  joinedAt!: Date;
}

export class MyCompany extends CompanyDto {
  @ApiProperty({
    type: () => CompanyMember,
    isArray: true,
  })
  companyMembers!: CompanyMember[];
}

export class CompanyJobResponseDto {
  id!: string;
  title!: string;
  description!: string;
  @ApiProperty({ enum: ExperienceLevel })
  experienceLevel!: ExperienceLevel | null;
  location!: string | null;
  salaryMin!: number | null;
  salaryMax!: number | null;
  currency!: string | null;
  isRemote!: boolean;
  @ApiProperty({ enum: JobStatus })
  status!: JobStatus;
  companyId!: string;
  createdById!: string;
  createdAt!: Date;
  updatedAt!: Date;
}
