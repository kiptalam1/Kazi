import { api } from "@/lib/api/client";
import type { Experience, ExperienceBody } from "../types/candidate.types";

export default async function addCandidateWorkExperience(data: ExperienceBody)
  : Promise<{
    message: string,
    data: Experience
  }> {
  const res = await api.post('/candidates/me/experiences', data);
  return res.data;
}
