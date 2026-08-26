import { useQuery } from '@tanstack/react-query';
import { getCandidateResumes } from '../api/get-candidate-resumes';

export function useCandidateResumes() {
  return useQuery({
    queryKey: ['myresumes'],
    queryFn: getCandidateResumes,
  });
}
