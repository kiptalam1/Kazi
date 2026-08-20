import { FileType } from '@/features/common/types/common.types';

export type Avatar = {
  id: string;
  fileName: string;
  size: number;
  mimeType: string;
  url: string;
  type: FileType;
};

export type UploadAvatarResponse = {
  message: string;
  data: Avatar;
};
