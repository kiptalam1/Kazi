import { useQuery } from '@tanstack/react-query';
import getEmployerCompany from '../api/get-employer-company';

export default function useMyCompany() {
  return useQuery({
    queryKey: ['mycompanies'],
    queryFn: getEmployerCompany,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
}
