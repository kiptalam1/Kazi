import { ApiProperty } from '@nestjs/swagger';
import { EmploymentType } from '../../../generated/prisma/enums.js';

export class ExperienceDto {
  id!: string;
  jobTitle!: string;
  companyName!: string;
  location?: string | null;
  @ApiProperty({ enum: EmploymentType })
  employmentType?: EmploymentType | null;
  startDate!: Date;
  endDate?: Date | null;
  isCurrent!: boolean;
  description?: string | null;
}

export class ExperienceApiResponse {
  message!: string;
  @ApiProperty({ type: () => ExperienceDto })
  data!: ExperienceDto;
}
