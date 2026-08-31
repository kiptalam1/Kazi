import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { ExperienceLevel } from '../../generated/prisma/enums.js';
import { ApiProperty } from '@nestjs/swagger';

export class CandidateUpdateDto {
  @IsOptional()
  @IsString()
  headline!: string | null;

  @IsOptional()
  @IsString()
  bio!: string | null;

  @IsOptional()
  @IsString()
  location!: string | null;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  skills!: string[];

  @IsOptional()
  @IsEnum(ExperienceLevel)
  @ApiProperty({ enum: ExperienceLevel })
  experienceLevel!: ExperienceLevel | null;

  @IsOptional()
  @IsString()
  currentJobTitle!: string | null;

  @IsOptional()
  salaryExpectation!: number | null;

  @IsOptional()
  @IsBoolean()
  availability!: boolean;

  @IsOptional()
  @IsString()
  linkedinUrl!: string | null;

  @IsOptional()
  @IsString()
  githubUrl!: string | null;

  @IsOptional()
  @IsString()
  portfolioUrl!: string | null;

  @IsOptional()
  @IsString()
  resumeUrl!: string | null;
}
