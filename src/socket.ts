import { io, Socket } from "socket.io-client";

// socket-events.ts
export interface ClientToServerEvents {
  join: (userId: number) => void;
}

export interface ServerToClientEvents {
  debtNotifications: (data: LiveDebtNotification) => void;
}

export interface LiveDebtNotification {
  notificationId: number;
  message: string;
  userMessage?: string;
  timestamp: string;
}

let socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;

export const connectSocket = (token: string, userId: number) => {
  socket = io("http://localhost:3001", {
    query: { token },
  });

  socket.on("connect", () => {
    console.log("Connected to WebSocket server:", socket?.id);

    // Join the user's specific room
    socket?.emit("join", userId);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from WebSocket server");
  });

  return socket;
};

export const getSocket = () => socket;
