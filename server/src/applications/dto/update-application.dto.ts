import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateApplicationDto } from './create-application.dto.js';
import { ApplicationStatus } from '../../generated/prisma/enums.js';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateApplicationDto extends PartialType(CreateApplicationDto) {}

export class UpdateApplicationStatusDto {
  @ApiProperty({
    enumName: 'ApplicationStatus',
    enum: ApplicationStatus,
  })
  @IsEnum(ApplicationStatus)
  status!: ApplicationStatus;

  @IsOptional()
  @IsString()
  employerNotes?: string;
}
