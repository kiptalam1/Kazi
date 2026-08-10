import { ApiProperty } from "@nestjs/swagger";
import { FileType } from "../../generated/prisma/enums.js";

export class ResumeUploaded {
  id!: string;
  fileName!: string;
  displayName!: string | null;
  size!: number
  mimeType!: string;
  url!: string;
  @ApiProperty({ type: () => FileType })
  type!: FileType;
}

export class UploadResumeApiResponse {
  message!: string;
  @ApiProperty({ type: () => ResumeUploaded })
  data!: ResumeUploaded;
}
