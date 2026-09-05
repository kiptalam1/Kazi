import { useQuery } from '@tanstack/react-query';
import getApplicationsPerJob from '../api/get-applications-per-job';

export default function useApplicationsPerJob(jobId: string) {
  return useQuery({
    queryKey: ['apps', jobId],
    queryFn: () => getApplicationsPerJob(jobId),
  });
}
