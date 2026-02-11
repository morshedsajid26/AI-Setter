"use client";
import React, { useState, useEffect } from "react";
import Bredcumb from "@/src/components/Bredcumb";
import Pagination from "@/src/components/Pagination";
import { BASE_URL } from "@/src/config/api";
import Cookies from "js-cookie";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const itemsPerPage = 10;

  /* -------------------- Fetch -------------------- */
  const fetchNotifications = async (page = 1) => {
    try {
      setLoading(true);
      const token = Cookies.get("accessToken");

      const res = await fetch(
        `${BASE_URL}/notifications?page=${page}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      setNotifications(data.results || []);
      setCount(data.count || 0);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications(currentPage);
  }, [currentPage]);

  /* -------------------- Mark Read / Unread -------------------- */
  const handleMark = async (id) => {
    try {
      const token = Cookies.get("accessToken");

      await fetch(`${BASE_URL}/notifications/mark/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // 🔥 Optimistic UI update
      setNotifications((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, is_read: !item.is_read }
            : item
        )
      );
    } catch (error) {
      console.error("Mark error:", error);
    }
  };

  /* -------------------- Time Ago -------------------- */
  const timeAgo = (timestamp) => {
    if (!timestamp) return "";

    const now = new Date();
    const then = new Date(timestamp);
    const diffMs = now - then;

    const diffMin = Math.floor(diffMs / 1000 / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffMin < 1) return "Just now";
    if (diffMin < 60) return `${diffMin} minutes ago`;
    if (diffHour < 24) return `${diffHour} hours ago`;
    return `${diffDay} days ago`;
  };

  const totalPages = Math.ceil(count / itemsPerPage);

  return (
    <div className="w-full p-7 bg-white rounded-[10px]">
      <Bredcumb />

      <p className="text-[#333] text-[16px] font-semibold mt-5">
        Total {count} Notifications
      </p>

      <div className="mt-6">
        {loading ? (
          <p>Loading...</p>
        ) : notifications.length === 0 ? (
          <p>No Notifications Found</p>
        ) : (
          notifications.map((item) => (
            <div
              key={item.id}
              onClick={() => handleMark(item.id)}
              className={`py-3 px-6 cursor-pointer transition-all ${
                !item.is_read
                  ? "bg-red-100"
                  : "hover:bg-red-50"
              }`}
            >
              <div className="flex justify-between">
                <p className="font-semibold">
                  {item.message}
                </p>

                <p className="text-sm text-gray-500">
                  {timeAgo(item.created_at)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Notification;
