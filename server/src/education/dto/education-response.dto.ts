import { ApiProperty } from '@nestjs/swagger';
import { Qualification } from '../../generated/prisma/enums.js';

export class CreatedEducationDto {
  id!: string;
  schoolName!: string;
  fieldOfStudy?: string | null;
  @ApiProperty({ type: () => Qualification })
  qualification!: Qualification;
  startDate!: Date;
  endDate?: Date | null;
}

export class EducationCreatedApiResponse {
  message!: string;
  @ApiProperty({ type: () => CreatedEducationDto })
  data!: CreatedEducationDto;
}
