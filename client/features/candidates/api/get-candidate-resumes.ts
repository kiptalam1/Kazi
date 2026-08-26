import { api } from '@/lib/api/client';
import type { Resume } from '../types/candidate.types';

export async function getCandidateResumes(): Promise<Resume[]> {
  const res = await api.get('/candidates/me/resumes');
  return res.data;
}
