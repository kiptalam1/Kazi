import { api } from '@/lib/api/client';

export default async function deleteNotification(
  id: string,
): Promise<{ message: string }> {
  const res = await api.delete(`/notifications/${id}`);
  return res.data;
}
