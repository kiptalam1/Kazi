import { ApiProperty } from '@nestjs/swagger';
import { CompanyRole } from '../../generated/prisma/enums.js';
import { UserDto } from '../../users/dto/user-response.dto.js';

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

export class Meta {
  page!: number;
  limit!: number;
  total!: number;
  totalPages!: number;
}

export class GetAllCompaniesResponseDto {
  @ApiProperty({ type: [CompanyDto] })
  data!: CompanyDto[];

  @ApiProperty({ type: Meta })
  meta!: Meta;
}
