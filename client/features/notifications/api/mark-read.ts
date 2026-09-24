import { api } from '@/lib/api/client';

export default async function markRead(id: string) {
  const res = await api.patch(`/notifications/${id}/read`);
  return res.data;
}
