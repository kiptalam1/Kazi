import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
import { ExperienceLevel, JobStatus } from '../../generated/prisma/enums.js';
import { ApiProperty } from '@nestjs/swagger';

export class CreateJobDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3, { message: 'Job title must be atleast 3 characters long.' })
  title!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3, {
    message: 'Job description must be atleast 3 characters long.',
  })
  description!: string;

  @IsOptional()
  @IsEnum(ExperienceLevel, {
    message: `Experience must be one of: ${Object.values(ExperienceLevel).join(', ')}`,
  })
  @ApiProperty({
    enumName: 'ExperienceLevel',
    enum: ExperienceLevel,
  })
  experienceLevel?: ExperienceLevel;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  location?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  salaryMin?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  salaryMax?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  currency?: string;

  @IsBoolean({
    message: 'isRemote must be true or false',
  })
  @ApiProperty({ default: false })
  isRemote!: boolean;

  @IsEnum(JobStatus, {
    message: `Status must be one of: ${Object.values(JobStatus).join(', ')}`,
  })
  @ApiProperty({
    enum: JobStatus,
    enumName: 'JobStatus',
  })
  @IsOptional()
  status?: JobStatus;
}
