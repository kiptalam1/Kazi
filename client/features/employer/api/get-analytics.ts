import { api } from '@/lib/api/client';
import { DashboardAnalytics } from '../types/analytics.types';

export default async function getAnalytics(): Promise<DashboardAnalytics> {
  const res = await api.get('/companies/me/analytics');
  return res.data;
}
