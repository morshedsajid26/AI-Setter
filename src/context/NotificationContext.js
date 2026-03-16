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

  /* WebSocket removed as per user request */
  useEffect(() => {
    // Relying on other mechanisms for notifications now
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
