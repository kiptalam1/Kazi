import { Transform, Type } from 'class-transformer';
import { IsOptional, IsInt, Min, Max, IsString, IsBoolean, IsIn, IsEnum } from 'class-validator';
import { ExperienceLevel } from '../../generated/prisma/enums.js';
export class GetQueryDto {
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
  @IsString()
  search?: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) =>
    value === 'true' ? true :
      value === 'false' ? false :
        value)
  isRemote?: boolean;

  @IsOptional()
  @IsString()
  companySlug?: string;

  @IsOptional()
  @IsIn(['createdAt', 'salaryMax'])
  sortBy: 'createdAt' | 'salaryMax' = 'createdAt';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  order: 'asc' | 'desc' = 'desc';

  @IsOptional()
  @IsEnum(ExperienceLevel)
  experienceLevel?: ExperienceLevel;
}
