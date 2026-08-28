import { api } from "@/lib/api/client";
import { Education, EducationBody } from "../types/candidate.types";

export default async function updatedCandidateEducation(
  educationId: string,
  data: EducationBody
): Promise<{
  data: Education;
  message: string;
}> {
  const res = await api.patch(`/candidates/me/education/${educationId}`, data);
  return res.data;
}
