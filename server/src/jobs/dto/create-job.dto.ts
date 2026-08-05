import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { ExperienceLevel, JobStatus } from "../../generated/prisma/enums.js";
import { ApiProperty } from "@nestjs/swagger";

export class CreateJobDto {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsString()
  description!: string;

  @IsOptional()
  @ApiProperty({
    enumName: 'ExperienceLevel',
    enum: ExperienceLevel
  })
  experienceLevel?: ExperienceLevel;

  @IsString()
  @IsOptional()
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
  currency?: string;

  @IsBoolean()
  @ApiProperty({ default: false })
  isRemote!: Boolean;

  @IsString()
  @ApiProperty({
    enum: JobStatus,
    enumName: 'JobStatus'
  })
  status!: JobStatus;
}
