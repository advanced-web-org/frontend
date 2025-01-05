import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { DebtNotification, markNotificationAsRead } from "../api/notfication.api";

const NotificationItem: React.FC<{ noti: DebtNotification }> = ({ noti }) => {
  const [isRead, setIsRead] = useState(noti.is_read);
  const queryClient = useQueryClient();

  const handleNotificationClick = async () => {
    try {
      if (isRead) return; // Do nothing if the notification is already read
      console.log("Marking notification as read:", noti.notification_id);
      await markNotificationAsRead(noti.notification_id);
      setIsRead(true); // Update the local state to reflect the "read" status
      queryClient.invalidateQueries({ queryKey: ["debtNotifications"] });
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  return (
    <div
      className={
        "border-b p-4 mb-2 rounded-md shadow-sm cursor-pointer transition-all " +
        (isRead ? "bg-white" : "bg-gray-100 border-l-4 border-gray-500")
      }
      onClick={handleNotificationClick}
    >
      <p className="text-gray-800 font-medium">{noti.message}</p>
      <p className="text-gray-500 text-xs">{new Date(noti.created_at).toLocaleString()}</p>
    </div>
  );
}

export default NotificationItem;