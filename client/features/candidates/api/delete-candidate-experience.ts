import { api } from '@/lib/api/client';

export default async function deleteCandidateExperience(experienceId: string) {
  const res = await api.delete(`/candidates/me/experiences/${experienceId}`);
  return res.data;
}
