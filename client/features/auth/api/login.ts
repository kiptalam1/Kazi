import { api } from '@/lib/api/client';
import type { LoginBody, LoginResponse } from '../types/login.types';

export async function loginUser(data: LoginBody): Promise<LoginResponse> {
  const res = await api.post('/auth/login', data);
  return res.data;
}
