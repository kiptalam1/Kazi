import { api } from '@/lib/api/client';
import { SingleApplicationResponse } from '../types/get-single-application.types';

export default async function getSingleCandidateApplication(
  applicationId: string,
): Promise<SingleApplicationResponse> {
  const res = await api.get(`/applications/employer/${applicationId}`);
  return res.data;
}
