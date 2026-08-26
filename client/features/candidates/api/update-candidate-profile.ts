import { api } from '@/lib/api/client';
import type { CandidateUpdatePayload } from '../types/candidate.types';
import type { Candidate } from '@/features/common/types/common.types';

export default async function updateCandidateProfile(
  data: CandidateUpdatePayload,
): Promise<Candidate> {
  const res = await api.patch('/candidates/me', data);
  return res.data;
}
