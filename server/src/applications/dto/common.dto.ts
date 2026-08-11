import { ApiProperty } from '@nestjs/swagger';
import { FileType } from '../../generated/prisma/enums.js';

export class FileResponse {
  id!: string;
  fileName!: string;
  @ApiProperty({ nullable: true })
  displayName?: string | null;
  mimeType!: string;
  size!: number;
  url!: string;
  @ApiProperty({ type: () => FileType })
  type!: FileType;
  createdAt!: Date;
}
