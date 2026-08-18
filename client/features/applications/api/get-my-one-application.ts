import { api } from '@/lib/api/client';
import type { MyApplication } from '../types/get-my-applications.types';

export default async function getMyOneApplication(
  applicationId: string,
): Promise<MyApplication> {
  const res = await api.get(`/applications/${applicationId}`);
  return res.data;
}
