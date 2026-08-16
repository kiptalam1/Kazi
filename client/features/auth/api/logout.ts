import { api } from '@/lib/api/client';

type LogoutResponse = {
  message: string;
};
export async function logoutUser(): Promise<LogoutResponse> {
  const res = await api.post('/auth/logout');
  return res.data;
}
