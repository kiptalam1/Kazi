import { api } from '@/lib/api/client';

export default async function deleteCandidateEducation(educationId: string) {
  const res = await api.delete(`/candidates/me/education/${educationId}`);
  return res.data;
}
