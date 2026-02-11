"use client";
import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import { BASE_URL } from "@/src/config/api";
import toast from "react-hot-toast";

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const socketRef = useRef(null);

  useEffect(() => {
    // Initial fetch might be needed if backend supports persistency, 
    // but for now we rely on WS for real-time updates.
    // If there's an API to get past notifications, fetch it here.
    
    let retryCount = 0;
    const maxRetries = 3;

    // FEATURE FLAG: Set to true when backend WebSocket endpoint is ready
    const ENABLE_NOTIFICATIONS_WS = true; 

    const connectSocket = () => {
      if (!BASE_URL || !ENABLE_NOTIFICATIONS_WS) return;

      const wsUrl = BASE_URL.replace(/^http/, 'ws') + '/ws/notifications/';
      const socket = new WebSocket(wsUrl);
      socketRef.current = socket;

      socket.onopen = () => {
        console.log("✅ WebSocket Connected");
        retryCount = 0; // Reset retries on successful connection
      };

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          const newNotification = {
            id: Date.now(),
            message: data.message,
            time: data.time || new Date().toISOString(),
            read: false,
          };

          setNotifications((prev) => [newNotification, ...prev]);
          setUnreadCount((prev) => prev + 1);
          
          toast(data.message, { icon: '🔔' });
        } catch (err) {
          // Silent catch for invalid data
        }
      };

      socket.onerror = (error) => {
        // Suppress console error regarding connection failure
      };

      socket.onclose = () => {
        if (retryCount < maxRetries) {
          retryCount++;
          setTimeout(connectSocket, 3000 * retryCount); 
        } else {
          console.warn("WebSocket reconnection stopped after max retries.");
        }
      };
    };

    if (ENABLE_NOTIFICATIONS_WS) {
      connectSocket();
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  const markAsRead = () => {
    setUnreadCount(0);
    // If backend has endpoint to mark read, call it here
  };

  const handleApprove = (notification) => {
    toast.success("Request Approved");
    // Call API if exists
  };

  const handleReject = (notification) => {
    toast.error("Request Rejected");
    // Call API if exists
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        handleApprove,
        handleReject,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
