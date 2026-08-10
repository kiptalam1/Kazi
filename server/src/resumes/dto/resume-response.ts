import { ApiProperty } from "@nestjs/swagger";
import { FileType } from "../../generated/prisma/enums.js";

export class ResumeUploaded {
  @ApiProperty()
  id!: string;
  @ApiProperty()
  fileName!: string;
  @ApiProperty()
  displayName!: string | null;
  @ApiProperty()
  size!: number
  @ApiProperty()
  mimeType!: string;
  @ApiProperty()
  url!: string;
  @ApiProperty({ type: () => FileType })
  type!: FileType;
}

export class UploadResumeApiResponse {
  @ApiProperty()
  message!: string;
  @ApiProperty({ type: () => ResumeUploaded })
  data!: ResumeUploaded;
}
