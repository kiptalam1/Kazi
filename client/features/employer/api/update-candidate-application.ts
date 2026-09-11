import { api } from '@/lib/api/client';
import {
  ApplicationStatusUpdatedResponse,
  UpdateApplicationBody,
} from '../types/update-application.types';

export default async function UpdateCandidateApplication(
  applicationId: string,
  data: UpdateApplicationBody,
): Promise<ApplicationStatusUpdatedResponse> {
  const res = await api.patch(`/applications/${applicationId}/status`, data);
  return res.data;
}
