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
}

export class ApplicationResponse {
  message!: string;
  data!: ApplicationDataDto;
}
