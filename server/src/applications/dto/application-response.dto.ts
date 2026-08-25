import { Type } from 'class-transformer';
import {
  ApplicationStatus,
  ExperienceLevel,
  JobStatus,
} from '../../generated/prisma/enums.js';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { Meta } from '../../common/dto/meta.dto.js';
import { CreatedEducationDto } from '../../education/dto/education-response.dto.js';

export class ApplicationDataDto {
  @ApiProperty()
  id!: string;

  @ApiProperty({
    enum: ApplicationStatus,
    enumName: 'ApplicationStatus',
  })
  status!: ApplicationStatus;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt?: Date;
}

export class ApplicationCreatedResponse {
  @ApiProperty()
  message!: string;
  @ApiProperty({ type: () => ApplicationDataDto })
  data!: ApplicationDataDto;
}

class UpdatedApplicationDto {
  @ApiProperty()
  id!: string;

  @ApiProperty({
    enum: ApplicationStatus,
    enumName: 'ApplicationStatus',
  })
  status!: ApplicationStatus;

  @ApiProperty({ nullable: true })
  employerNotes!: string | null;

  @ApiProperty()
  reviewedAt!: Date | null;

  @ApiProperty()
  updatedAt!: Date;
}

export class ApplicationStatusUpdatedResponse {
  @ApiProperty()
  message!: string;
  @ApiProperty({ type: () => UpdatedApplicationDto })
  data!: UpdatedApplicationDto;
}

class WithdrawnApplicationDto {
  id!: string;

  @ApiProperty({
    enum: ApplicationStatus,
    enumName: 'ApplicationStatus',
  })
  status!: ApplicationStatus;
  createdAt!: Date;
  updatedAt!: Date;
  jobId!: string;
}

export class ApplicationWithdrawnResponse {
  @ApiProperty()
  message!: string;
  @ApiProperty({ type: () => WithdrawnApplicationDto })
  data!: WithdrawnApplicationDto;
}
export class QueryDto {
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1)
  page = 1;

  @Type(() => Number)
  @IsOptional()
  @Min(1)
  @Max(100)
  @IsInt()
  limit = 10;

  @IsOptional()
  @IsEnum(ApplicationStatus, {
    message: `status must be one of ${Object.values(ApplicationStatus).join(', ')}`,
  })
  status?: ApplicationStatus;
}

class Company {
  id!: string;
  name!: string;
  logoUrl?: string | null;
}

class Job {
  id!: string;
  title!: string;
  location?: string | null;
  isRemote!: boolean;
  @ApiProperty({ enum: JobStatus, enumName: 'JobStatus' })
  status!: JobStatus;
  @ApiProperty({ type: () => Company })
  company!: Company;
}

class CandidateApplication {
  id!: string;

  @ApiProperty({ type: () => ApplicationStatus })
  status!: ApplicationStatus;
  createdAt!: Date;
  updatedAt!: Date;
  reviewedAt?: Date | null;
  coverLetter?: string | null;

  @ApiProperty({ type: () => Job })
  job!: Job;
}

export class CandidateApplicationApiResponse {
  @ApiProperty({ type: () => CandidateApplication, isArray: true })
  data!: CandidateApplication[];
  @ApiProperty({
    type: () => Meta,
  })
  meta!: Meta;
}

class CandidateUserDto {
  @ApiProperty()
  firstName!: string;

  @ApiProperty()
  lastName!: string;

  @ApiProperty()
  email!: string;
}

class CandidateSummaryDto {
  @ApiProperty()
  id!: string;

  @ApiProperty({ nullable: true })
  headline!: string | null;

  @ApiProperty({ nullable: true })
  currentJobTitle!: string | null;

  @ApiProperty({
    enum: ExperienceLevel,
    enumName: 'ExperienceLevel',
  })
  experienceLevel?: ExperienceLevel | null;

  @ApiProperty({ type: () => CandidateUserDto })
  user!: CandidateUserDto;
}

export class EmployerApplicationDto {
  @ApiProperty()
  id!: string;

  @ApiProperty({
    enum: ApplicationStatus,
    enumName: 'ApplicationStatus',
  })
  status!: ApplicationStatus;

  @ApiProperty({ nullable: true })
  coverLetter!: string | null;

  @ApiProperty({ nullable: true })
  reviewedAt!: Date | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  @ApiProperty({ type: () => CandidateSummaryDto })
  candidate!: CandidateSummaryDto;
}

export class EmployerApplicationsResponseDto {
  @ApiProperty({ type: [EmployerApplicationDto] })
  data!: EmployerApplicationDto[];

  @ApiProperty({ type: () => Meta })
  meta!: Meta;
}

class CandidateJob {
  id!: string;
  @ApiProperty({ type: () => JobStatus })
  status!: JobStatus;
  createdAt!: Date;
  title!: string;
  location?: string | null;
  @ApiProperty({ type: () => Company })
  company!: Company;
}

export class SingleCandidateApplicationResponseDto {
  id!: string;
  coverLetter?: string | null;
  @ApiProperty({ type: () => ApplicationStatus })
  status!: ApplicationStatus;
  createdAt!: Date;
  updatedAt!: Date;
  reviewedAt?: Date | null;
  @ApiProperty({ type: () => CandidateJob })
  job!: CandidateJob;
}

export class EmployerApplicationCandidateUserDto {
  @ApiProperty()
  firstName!: string;

  @ApiProperty()
  lastName!: string;

  @ApiProperty()
  avatar?: string | null;

  @ApiProperty()
  email!: string;
}

export class EmployerApplicationCandidateDto {
  @ApiProperty()
  id!: string;

  @ApiProperty({ nullable: true })
  currentJobTitle!: string | null;

  @ApiProperty({ nullable: true })
  bio!: string | null;

  @ApiProperty({ nullable: true })
  headline!: string | null;

  @ApiProperty({ nullable: true })
  location!: string | null;

  @ApiProperty({ nullable: true })
  githubUrl!: string | null;

  @ApiProperty({ nullable: true })
  linkedinUrl!: string | null;

  @ApiProperty({
    type: () => ExperienceLevel,
  })
  experienceLevel!: ExperienceLevel | null;

  @ApiProperty()
  availability!: boolean;

  @ApiProperty({ nullable: true })
  portfolioUrl!: string | null;

  @ApiProperty({ type: [CreatedEducationDto] })
  education!: CreatedEducationDto[];

  @ApiProperty({ type: [String] })
  skills!: string[] | null;

  @ApiProperty({ nullable: true })
  salaryExpectation!: number | null;

  @ApiProperty({
    type: () => EmployerApplicationCandidateUserDto,
  })
  user!: EmployerApplicationCandidateUserDto;
}

export class EmployerApplicationJobDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  title!: string;

  @ApiProperty({
    type: () => JobStatus,
  })
  status!: JobStatus;

  @ApiProperty()
  companyId!: string;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty({
    type: () => ExperienceLevel,
    nullable: true,
  })
  experienceLevel!: ExperienceLevel | null;
}

export class EmployerFetchSingleApplicationResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty({ nullable: true })
  coverLetter!: string | null;

  @ApiProperty()
  status!: string;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  @ApiProperty({ nullable: true })
  reviewedAt!: Date | null;

  @ApiProperty({
    type: () => EmployerApplicationJobDto,
  })
  job!: EmployerApplicationJobDto;

  @ApiProperty({
    type: () => EmployerApplicationCandidateDto,
  })
  candidate!: EmployerApplicationCandidateDto;
}
