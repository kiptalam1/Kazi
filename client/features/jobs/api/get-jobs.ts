import { api } from "@/lib/api/client";
import type { JobsParams, GetJobsResponse } from "../types/get-jobs-types";

export async function getJobs({
  page = 1,
  limit = 10,
  search = '',
  isRemote,
  sortBy = 'createdAt',
  order = 'desc',
  experienceLevel
}: JobsParams): Promise<GetJobsResponse> {
  const res = await api.get('/jobs', {
    params: {
      page,
      limit,
      search,
      isRemote,
      sortBy,
      order,
      experienceLevel,
    }
  })
  return res.data;
}
