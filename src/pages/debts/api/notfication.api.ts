import api from "@/api/api";

export interface DebtNotification {
  message: string;
  created_at: string;
  is_read: boolean;
  notification_id: number;
}

export async function getNotifications(userId: number): Promise<DebtNotification[]> {
  const response = await api.get(`/notification/${userId}`);
  return response.data;
}

export async function markNotificationAsRead(notificationId: number): Promise<any> {
  const response = await api.patch(`/notification/${notificationId}`);
  return response.data;
}