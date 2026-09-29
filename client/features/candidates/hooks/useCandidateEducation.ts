import { useQuery } from '@tanstack/react-query';
import { getCandidateExperience } from '../api/get-candidate-education';

export function useCandidateEducation() {
  return useQuery({
    queryKey: ['myeducation'],
    queryFn: getCandidateExperience,
    staleTime: 5 * 60 * 1000,
  });
}
