import { api } from '@/lib/api/client';
import { type GetMeResponse } from '../types/get-me.types';

export async function getMe(): Promise<GetMeResponse> {
  const res = await api.get('/users/me', {
    skipAuthRefresh: true
  });
  return res.data;
}
