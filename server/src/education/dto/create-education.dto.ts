import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Qualification } from '../../generated/prisma/enums.js';
import { Type } from 'class-transformer';

export class CreateEducationDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Name must be at least 3 characters long.' })
  schoolName!: string;

  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'Field must be at least 3 characters long.' })
  fieldOfStudy?: string;

  @IsString()
  @IsEnum(Qualification, {
    message: `Qualification must be one of ${Object.values(Qualification).join(', ')}`,
  })
  qualification!: Qualification;

  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'City must be at least 2 characters long.' })
  city?: string;

  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'Country must be at least 2 characters long.' })
  country?: string;

  @Type(() => Date)
  @IsDate()
  startDate!: Date;

  @Type(() => Date)
  @IsDate()
  endDate?: Date;
}
