import { ApiProperty } from '@nestjs/swagger';
import { ExperienceLevel } from '../../generated/prisma/enums.js';
import { Meta } from '../../common/dto/meta.dto.js';

export class CandidateRoleDto {
  role!: string;
}

export class CandidateUserDto {
  firstName!: string;
  lastName!: string;
  avatar!: string | null;

  @ApiProperty({ type: () => [CandidateRoleDto] })
  roles!: CandidateRoleDto[];
}

export class CandidateDto {
  id!: string;
  userId!: string;
  headline!: string | null;
  bio!: string | null;
  location!: string | null;
  skills!: string[];

  experience!: unknown[];
  education!: unknown[];

  @ApiProperty({ enum: ExperienceLevel })
  experienceLevel!: ExperienceLevel | null;

  currentJobTitle!: string | null;
  salaryExpectation!: number | null;
  availability!: string | null;
  linkedinUrl!: string | null;
  githubUrl!: string | null;
  portfolioUrl!: string | null;
  resumeUrl!: string | null;

  createdAt!: Date;
  updatedAt!: Date;

  @ApiProperty({ type: () => CandidateUserDto })
  user!: CandidateUserDto;
}

export class GetAllCandidatesResponseDto {
  @ApiProperty({ type: () => [CandidateDto] })
  data!: CandidateDto[];

  @ApiProperty({ type: Meta })
  meta!: Meta;
}
