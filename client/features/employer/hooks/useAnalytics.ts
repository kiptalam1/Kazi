import { useQuery } from '@tanstack/react-query';
import getAnalytics from '../api/get-analytics';

export default function useAnalytics() {
  return useQuery({
    queryKey: ['dashboard-analytics'],
    queryFn: getAnalytics,
  });
}
