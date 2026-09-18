import { useQuery } from '@tanstack/react-query';
import getMyApplications from '../api/get-my-applications';
import { AppsParams } from '../types/get-my-applications.types';

export default function useMyApplications(params: AppsParams = {}) {
  return useQuery({
    queryKey: ['myapps', params],
    queryFn: () => getMyApplications(params),
  });
}
