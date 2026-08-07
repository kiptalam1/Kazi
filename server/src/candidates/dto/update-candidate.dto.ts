import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';
import { ExperienceLevel } from '../../generated/prisma/enums.js';
import { ApiProperty } from '@nestjs/swagger';

export class CandidateUpdateDto {
  @IsOptional()
  @IsString({ message: 'Headline must be a string' })
  headline!: string;

  @IsOptional()
  @IsString({ message: 'Bio must be a string' })
  bio!: string;

  @IsOptional()
  @IsString({ message: 'Location must be a string' })
  location!: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  skills!: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  experience!: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  education!: string[];

  @IsOptional()
  @IsEnum(ExperienceLevel)
  @ApiProperty({ enum: ExperienceLevel })
  experienceLevel!: ExperienceLevel;

  @IsOptional()
  @IsString({ message: 'Title must be a string' })
  currentJobTitle!: string;

  @IsOptional()
  salaryExpectation!: number;

  @IsOptional()
  @IsString()
  availability!: string;

  @IsOptional()
  @IsString()
  linkedinUrl!: string;

  @IsOptional()
  @IsString()
  githubUrl!: string;

  @IsOptional()
  @IsString()
  portfolioUrl!: string;

  @IsOptional()
  @IsString()
  resumeUrl!: string;
}
