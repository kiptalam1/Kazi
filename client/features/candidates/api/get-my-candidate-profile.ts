import type { Candidate } from "@/features/common/types/common.types";
import { api } from "@/lib/api/client";

export async function getMyCandidateProfile(): Promise<Candidate> {
  const res = await api.get('/candidates/me');
  return res.data;
}
