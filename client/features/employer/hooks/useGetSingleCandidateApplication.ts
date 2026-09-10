import { useQuery } from '@tanstack/react-query';
import getSingleCandidateApplication from '../api/get-single-candidate-application';

export default function useGetSingleCandidateApplication(
  applicationId: string,
) {
  return useQuery({
    queryKey: ['candidate-application', applicationId],
    queryFn: () => getSingleCandidateApplication(applicationId),
  });
}
