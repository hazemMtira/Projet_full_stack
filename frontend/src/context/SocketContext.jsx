import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Connect to your backend server
    const newSocket = io("http://localhost:5080", {
      transports: ["websocket"],
      autoConnect: true,
    });

    newSocket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    newSocket.on("lowStockAlert", (data) => {
      console.log("Low stock alert received:", data);

      // Add notification
      setNotifications((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...data,
          timestamp: new Date(),
        },
      ]);

      // Optional: Show browser notification
      if (Notification.permission === "granted") {
        new Notification("Low Stock Alert", {
          body: data.message,
        });
      }
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from Socket.IO server");
    });

    setSocket(newSocket);

    // Request notification permission
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }

    return () => {
      newSocket.close();
    };
  }, []);

  const clearNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        notifications,
        clearNotification,
        clearAllNotifications,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
