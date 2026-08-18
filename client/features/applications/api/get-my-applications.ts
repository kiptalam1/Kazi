import { api } from '@/lib/api/client';
import type {
  AppsParams,
  GetMyApplicationsResponse,
} from '../types/get-my-applications.types';

export default async function getMyApplications({
  page = 1,
  limit = 10,
  status,
}: AppsParams): Promise<GetMyApplicationsResponse> {
  const res = await api.get('/applications/me', {
    params: {
      page,
      limit,
      status,
    },
  });
  return res.data;
}
