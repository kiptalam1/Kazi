import { useQuery } from "@tanstack/react-query"
import { getMyCandidateProfile } from "../api/get-my-candidate-profile";

export function useCandidate() {
  return useQuery({
    queryKey: ['candidate', 'me'],
    queryFn: getMyCandidateProfile,
  });
}
