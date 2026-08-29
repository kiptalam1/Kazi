import { api } from '@/lib/api/client';
import type { Education, EducationBody } from '../types/candidate.types';

export default async function addCandidateEducation(
  data: EducationBody,
): Promise<{
  data: Education;
  message: string;
}> {
  const res = await api.post(`/candidates/me/education`, data);
  return res.data;
}
