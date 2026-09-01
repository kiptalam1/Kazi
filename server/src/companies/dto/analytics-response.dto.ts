import { ApiProperty } from '@nestjs/swagger';
import { ApplicationStatus } from '../../generated/prisma/enums.js';

export class ApplicationStatusCount {
  @ApiProperty({ example: 10 })
  PENDING!: number;

  @ApiProperty({ example: 8 })
  REVIEWING!: number;

  @ApiProperty({ example: 5 })
  SHORTLISTED!: number;

  @ApiProperty({ example: 3 })
  INTERVIEW!: number;

  @ApiProperty({ example: 2 })
  OFFERED!: number;

  @ApiProperty({ example: 1 })
  HIRED!: number;

  @ApiProperty({ example: 1 })
  REJECTED!: number;

  @ApiProperty({ example: 0 })
  WITHDRAWN!: number;
}

export class RecentApplicationDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  candidateName!: string;

  @ApiProperty()
  jobTitle!: string;

  @ApiProperty()
  appliedDate!: Date;

  @ApiProperty({ enum: ApplicationStatus })
  status!: ApplicationStatus;
}

export class AnalyticsResponseDto {
  @ApiProperty({ description: 'Number of active (published) jobs', example: 5 })
  activeJobs!: number;

  @ApiProperty({ description: 'Total number of applications', example: 45 })
  totalApplications!: number;

  @ApiProperty({
    description: 'Number of new applications in the last 7 days',
    example: 8,
  })
  newApplicationsThisWeek!: number;

  @ApiProperty({
    description: 'Breakdown of applications by status',
    type: ApplicationStatusCount,
  })
  applicationsByStatus!: ApplicationStatusCount;

  @ApiProperty({
    description: 'List of recent applications',
    type: () => RecentApplicationDto,
    isArray: true,
  })
  recentApplications!: RecentApplicationDto[];
}
