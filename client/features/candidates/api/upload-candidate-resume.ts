import { api } from "@/lib/api/client";
import type { UploadResumeResponse } from "../types/candidate.types";

export default async function uploadCanidateResume(data: FormData): Promise<UploadResumeResponse> {
  const res = await api.post('/candidates/me/resumes/upload', data);
  return res.data;
}
