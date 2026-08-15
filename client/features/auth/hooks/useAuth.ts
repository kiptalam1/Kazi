import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api/get-me";

export function useAuth() {
  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: getMe,
    retry: 3,
  });
}
