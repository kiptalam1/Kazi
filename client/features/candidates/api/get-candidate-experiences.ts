import { api } from '@/lib/api/client';
import type { Experience } from '../types/candidate.types';

export async function getCandidateExperiences(): Promise<Experience[]> {
  const res = await api.get('/candidates/me/experiences');
  return res.data;
}
