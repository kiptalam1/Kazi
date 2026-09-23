import { api } from "@/lib/api/client";
import { Notification } from "../types/common.types";

export default async function getAllNotifications(): Promise<Notification[]> {
  const res = await api.get('/notifications');
  return res.data;
}
