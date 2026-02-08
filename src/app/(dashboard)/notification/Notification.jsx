"use client";
import Bredcumb from "@/src/components/Bredcumb";
import Pagination from "@/src/components/Pagination";
import { BASE_URL } from "@/src/config/api";
import { useNotification } from "@/src/context/NotificationContext";
import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";

const Notification = () => {
  /* -------------------- Context -------------------- */
  const { notifications, handleApprove, handleReject, markAsRead } = useNotification();
  
  const [currentPage, setCurrentPage] = useState(1);
  const [popOpen, setPopOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  useEffect(() => {
    markAsRead();
  }, []);

  /* -------------------- Time Ago Function -------------------- */
  function timeAgo(timestamp) {
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
  }

  /* -------------------- Pagination -------------------- */
  const itemsPerPage = 10;
  const totalPages = Math.ceil(notifications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = notifications.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="w-full p-7 bg-white overflow-x-auto rounded-[10px]">
      <div className="flex items-center gap-[14px]">
        <Bredcumb />
      </div>

      <p className="text-[#333333] text-[16px] font-semibold mt-[21px]">
        Total {notifications.length} Notifications
      </p>

      {/* Notification List */}
      <div className="mt-6">
        {currentItems.map((item, index) => (
          <div
            key={index}
            className="w-full hover:bg-[#FFCDD3] transition-all duration-300 py-3 px-[25px]"
          >
            <div
              onClick={() => {
                setSelectedNotification(item);
                setPopOpen(true);
              }}
              className="w-full flex items-center justify-between cursor-pointer"
            >
              <p className="w-[80%] text-[#333333] text-[16px] font-semibold">
                {item.message}
              </p>

              <p className="w-[20%] flex justify-end text-[#5C5C5C] text-[14px] whitespace-nowrap">
                {timeAgo(item.time)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {/* Popup */}
      {popOpen && selectedNotification && (
        <div className="fixed inset-0 bg-[#00000050] flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl py-10 px-10 w-[30%]">
            <div className="flex justify-end mb-5">
              <FiX
                onClick={() => setPopOpen(false)}
                className="h-6 w-6 cursor-pointer"
              />
            </div>

            <p className="font-medium text-[16px]">
              {selectedNotification.message}
            </p>

            <div className="flex justify-center items-center gap-10 mt-8">
              <button 
                onClick={() => {
                   handleApprove(selectedNotification);
                   setPopOpen(false);
                }}
                className="border border-[#7AA3CC] py-2 px-8 rounded-lg"
              >
                Approve
              </button>
              <button 
                onClick={() => {
                   handleReject(selectedNotification);
                   setPopOpen(false);
                }}
                className="bg-[#ED4539] text-white py-2 px-8 rounded-lg"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
