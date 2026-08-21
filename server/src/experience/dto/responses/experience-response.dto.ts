import { ApiProperty } from '@nestjs/swagger';
import { EmploymentType } from '../../../generated/prisma/enums.js';

export class ExperienceDto {
  id!: string;
  jobTitle!: string;
  companyName!: string;
  @ApiProperty({ type: () => EmploymentType })
  location?: string | null;
  employmentType?: EmploymentType | null;
  startDate!: Date;
  endDate?: Date | null;
  isCurrent!: boolean;
  description?: string | null;
}

export class ExperienceApiResponse {
  message!: string;
  data!: ExperienceDto;
}
