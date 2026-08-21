import { api } from "@/lib/api/client";
import type { ApplicationWithdrawnResponse } from "../types/withdraw-app.types";

export async function withdrawApplication(applicationId: string): Promise<ApplicationWithdrawnResponse> {
  const res = await api.patch(`/applications/${applicationId}/withdraw`);
  return res.data;
}
