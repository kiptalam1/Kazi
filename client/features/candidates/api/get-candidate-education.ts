import { api } from '@/lib/api/client';
import { Education } from '../types/candidate.types';

export async function getCandidateExperience(): Promise<Education[]> {
  const res = await api.get('/candidates/me/education');
  return res.data;
}
