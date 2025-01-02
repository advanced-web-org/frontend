import React, { useState } from "react";
import { IoIosNotifications, IoIosNotificationsOutline } from "react-icons/io";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getNotifications, markNotificationAsRead, DebtNotification } from "../api/notfication.api";
import { useQuery, useQueryClient } from "@tanstack/react-query";

type NotificationsPopoverProps = {
  userId: number;
};

const NotificationsPopover: React.FC<NotificationsPopoverProps> = ({ userId }) => {

  const {
    data: notifications,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["debtNotifications"],
    queryFn: () => getNotifications(userId),
  });

  console.log("kiet notifications", notifications);

  return (
    <Popover>
      <PopoverTrigger>
        {notifications && notifications.some((noti) => !noti.is_read) ? (
          <IoIosNotifications size={32} className="cursor-pointer" />
        ) : (
          <IoIosNotificationsOutline size={32} className="cursor-pointer" />
        )}
      </PopoverTrigger>
      <PopoverContent
        align="start"
        side="left"
        className="w-80 max-h-96 bg-white border p-0 shadow-md rounded-md overflow-y-auto"
      >
        <div className="sticky top-0 bg-white z-10 shadow-sm border-b p-2">
          <h3 className="text-lg font-semibold">Notifications</h3>
        </div>
        <div className="mt-2 space-y-2">
          {isLoading ? (
            <l-bouncy size="45" speed="1.75" color="black"></l-bouncy>
          ) : isError ? (
            <p className="text-center text-red-500">Error loading debts</p>
          ) : notifications && notifications.length > 0 ? (
            notifications.map((noti) => (
              <NotificationItem key={noti.notification_id} noti={noti} />
            ))
          ) : (
            <p className="text-gray-500">No new notifications</p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsPopover;


const NotificationItem: React.FC<{ noti: DebtNotification }> = ({ noti }) => {
  const [isRead, setIsRead] = useState(noti.is_read);
  const queryClient = useQueryClient(); // Access query client

  const handleNotificationClick = async () => {
    try {
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