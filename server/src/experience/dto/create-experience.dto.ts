import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { EmploymentType } from '../../generated/prisma/enums.js';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateExperienceDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  jobTitle!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  companyName!: string;

  @ApiProperty({ nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(3)
  location?: string;

  @ApiProperty({ nullable: true })
  @IsOptional()
  @IsString()
  @IsEnum(EmploymentType, {
    message: `Type must be one of ${Object.values(EmploymentType).join(', ')}`,
  })
  employmentType?: EmploymentType;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  startDate!: Date;

  @ApiProperty({ nullable: true })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  endDate?: Date;

  @IsBoolean()
  isCurrent!: boolean;

  @ApiProperty({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;
}
