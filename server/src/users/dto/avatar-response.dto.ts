import { ApiProperty } from '@nestjs/swagger';
import { FileType } from '../../generated/prisma/enums.js';

export class AvatarUploaded {
  @ApiProperty()
  id!: string;
  @ApiProperty()
  fileName!: string;
  @ApiProperty()
  size!: number;
  @ApiProperty()
  mimeType!: string;
  @ApiProperty()
  url!: string;
  @ApiProperty({ type: () => FileType })
  type!: FileType;
}

export class UploadAvatarApiResponse {
  @ApiProperty()
  message!: string;
  @ApiProperty({ type: () => AvatarUploaded })
  data!: AvatarUploaded;
}
