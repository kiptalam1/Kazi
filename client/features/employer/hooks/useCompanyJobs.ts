import { useQuery } from '@tanstack/react-query';
import getCompanyJobs from '../api/get-company-jobs';

export default function useCompanyJobs() {
  return useQuery({
    queryKey: ['company-jobs'],
    queryFn: getCompanyJobs,
  });
}
