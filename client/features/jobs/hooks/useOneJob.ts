import { useQuery } from '@tanstack/react-query';
import { getOneJob } from '../api/get-job';

export function useOneJob(id: string) {
  return useQuery({
    queryKey: ['job', id],
    queryFn: () => getOneJob(id),
  });
}
