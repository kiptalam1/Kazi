import { useQuery } from '@tanstack/react-query';
import getAllNotifications from '../api/get-all-notifications';

export default function useAllNotifications() {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: getAllNotifications,
    retry: 3,
  });
}
