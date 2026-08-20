import { api } from '@/lib/api/client';
import type { UploadAvatarResponse } from '../types/upload-avatar.types';

export async function uploadAvatar(
  data: FormData,
): Promise<UploadAvatarResponse> {
  const res = await api.post('/users/me/avatar', data);
  return res.data;
}
