import { ApplicationStatus } from "../../generated/prisma/enums.js";
import { ApiProperty } from "@nestjs/swagger";

export class ApplicationDataDto {
  @ApiProperty()
  id!: string;

  @ApiProperty({
    enum: ApplicationStatus,
    enumName: 'ApplicationStatus',
  })
  status!: ApplicationStatus;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt?: Date;
}

export class ApplicationCreatedResponse {
  @ApiProperty()
  message!: string;
  @ApiProperty({ type: () => ApplicationDataDto })
  data!: ApplicationDataDto;
}

class UpdatedApplicationDto {
  @ApiProperty()
  id!: string;

  @ApiProperty({
    enum: ApplicationStatus,
    enumName: 'ApplicationStatus',
  })
  status!: ApplicationStatus;

  @ApiProperty({ nullable: true })
  employerNotes!: string | null;

  @ApiProperty()
  reviewedAt!: Date | null;

  @ApiProperty()
  updatedAt!: Date;
}

export class ApplicationStatusUpdatedResponse {
  @ApiProperty()
  message!: string;
  @ApiProperty({ type: () => UpdatedApplicationDto })
  data!: UpdatedApplicationDto;
}

class WithdrawnApplicationDto {
  id!: string;

  @ApiProperty({
    enum: ApplicationStatus,
    enumName: 'ApplicationStatus',
  })
  status!: ApplicationStatus;
  createdAt!: Date;
  updatedAt!: Date;
  jobId!: string;
}

export class ApplicationWithdrawnResponse {
  @ApiProperty()
  message!: string;
  @ApiProperty({ type: () => WithdrawnApplicationDto })
  data!: WithdrawnApplicationDto;
}
