import { useQuery } from '@tanstack/react-query';
import { getCandidateExperiences } from '../api/get-candidate-experiences';

export function useCandidateExperiences() {
  return useQuery({
    queryKey: ['myexperiences'],
    queryFn: getCandidateExperiences,
  });
}
