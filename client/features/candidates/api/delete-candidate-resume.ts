import { api } from '@/lib/api/client';

export default async function deleteCandidateResume(resumeId: string): Promise<{
  message: string;
}> {
  const res = await api.delete(`/candidates/me/resumes/${resumeId}/delete`);
  return res.data;
}
