import React, { useCallback, useEffect, useState } from "react";
import { IoIosNotifications, IoIosNotificationsOutline } from "react-icons/io";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getNotifications, DebtNotification } from "../api/notfication.api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { connectSocket, getSocket, LiveDebtNotification } from "@/socket";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/authStore";
import NotificationItem from "./notification-item";


type NotificationsPopoverProps = {
  userId: number;
};

const NotificationsPopover: React.FC<NotificationsPopoverProps> = ({ userId }) => {
  const { accessToken } = useAuthStore((state) => state);
  const [liveNotification, setLiveNotification] = useState<DebtNotification>();
  const queryClient = useQueryClient();


  const { data: notifications = [], isLoading, isError } = useQuery({
    queryKey: ["debtNotifications"],
    queryFn: () => {
      setLiveNotification(undefined); // Clear live notification before fetching
      return getNotifications(userId);
    }
  });

  // Handle new notifications from WebSocket
  const handleNewNotification = useCallback(
    (noti: LiveDebtNotification) => {
      const newNoti: DebtNotification = {
        notification_id: noti.notificationId,
        message: noti.message,
        created_at: new Date(noti.timestamp).toISOString(),
        is_read: false,
      };

      console.log("New notification:", newNoti);

      setLiveNotification(newNoti); // Update live notification
      queryClient.invalidateQueries({ queryKey: ["debtNotifications"], refetchType: "none" }); // next time we fetch, chung ta call api thay vi lay tu cache
      toast.success(noti.message);
    },
    [queryClient]
  );

  useEffect(() => {
    if (!accessToken) {
      throw new Error("Access token is required to connect to WebSocket");
    }
    const socket = getSocket() || connectSocket(accessToken, userId);

    socket.on("debtNotifications", handleNewNotification);

    // Cleanup listener on unmount
    return () => {
      socket.off("debtNotifications", handleNewNotification);
    };
  }, [accessToken, userId, handleNewNotification]);

  // Combine live and fetched notifications
  const allNotifications = liveNotification ? [liveNotification, ...notifications] : notifications;

  return (
    <Popover>
      <PopoverTrigger>
        {allNotifications.some((noti) => !noti.is_read) ? (
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
            <div className="text-center p-4">Loading...</div>
          ) : isError ? (
            <p className="text-center text-red-500">Error loading notifications</p>
          ) : allNotifications.length > 0 ? (
            allNotifications.map(noti => (
              <NotificationItem key={noti.notification_id} noti={noti} />
            ))
          ) : (
            <p className="text-gray-500 text-center p-4">No new notifications</p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsPopover;