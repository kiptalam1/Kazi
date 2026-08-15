import { api } from '@/lib/api/client';
import type { RegisterBody, RegisterResponse } from '../types/register.types';

export async function registerUser(
  data: RegisterBody,
): Promise<RegisterResponse> {
  const res = await api.post('/auth/register', data);
  return res.data;
}
