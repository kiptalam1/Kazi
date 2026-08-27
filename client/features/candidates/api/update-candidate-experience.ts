import { api } from "@/lib/api/client";
import type { Experience, ExperienceBody } from "../types/candidate.types";
export default async function updateCandidateExperience(
  experienceId: string,
  data: ExperienceBody,
): Promise<{
  data: Experience;
  message: string;
}> {
  const res = await api.patch(`/candidates/me/experiences/${experienceId}`, data);
  return res.data;
}
