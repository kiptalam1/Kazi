import { useQuery } from '@tanstack/react-query';
import getAllCompanyApplications from '../api/get-all-company-applications';

export default function useAllCompanyApplications() {
  return useQuery({
    queryKey: ['company-applications'],
    queryFn: getAllCompanyApplications,
  });
}
