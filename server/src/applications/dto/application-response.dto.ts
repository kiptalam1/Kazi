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
  message!: string;
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
  message!: string;
  data!: UpdatedApplicationDto;
}
