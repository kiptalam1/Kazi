import { useQuery } from "@tanstack/react-query";
import { getJobs } from "../api/get-jobs";
import { JobsParams } from "../types/get-jobs-types";

export function useJobs(params: JobsParams = {}) {
  return useQuery({
    queryKey: ['jobs', params],
    queryFn: () => getJobs(params),
  });
}
