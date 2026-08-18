import { useQuery } from '@tanstack/react-query';
import getMyOneApplication from '../api/get-my-one-application';

export default function useMyOneApplication(applicationId: string) {
  return useQuery({
    queryKey: ['applications', applicationId],
    queryFn: () => getMyOneApplication(applicationId),
  });
}
