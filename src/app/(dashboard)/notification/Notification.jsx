"use client";
import Bredcumb from "@/src/components/Bredcumb";
import Pagination from "@/src/components/Pagination";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";

const Notification = () => {
  const [baseOnTitle, setBaseOnTitle] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [popOpen, setPopOpen] = useState(false);

  const pageItems = [
    {
      message: " Facebook API token expired — reconnect required.”",
      time: "2025-01-10T10:00:00",
    },
    {
      message: "New Discovery Call booked by James for Monday 4 PM”",
      time: "2025-01-10T11:00:00",
    },

    {
      message: "AI detected Mindset Issue for user Rafi (Instagram)”",
      time: "2024-01-10T12:00:00",
    },
    {
      message: "New DM from Roni on Instagram: “Hey I need help…",
      time: "2025-01-10T10:00:00",
    },
    {
      message: "New Discovery Call booked by James for Monday 4 PM”",
      time: "2025-01-10T11:00:00",
    },

    {
      message: " Facebook API token expired — reconnect required.”",
      time: "2024-01-10T12:00:00",
    },
    {
      message: "New DM from Roni on Instagram: “Hey I need help…",
      time: "2025-01-10T10:00:00",
    },
    {
      message: " Facebook API token expired — reconnect required.”",
      time: "2025-01-10T11:00:00",
    },

    {
      message: " Facebook API token expired — reconnect required.”",
      time: "2025-01-10T11:00:00",
    },
    {
      message: " Facebook API token expired — reconnect required.”",
      time: "2025-01-10T11:00:00",
    },

    {
      message: " Facebook API token expired — reconnect required.”",
      time: "2025-01-10T11:00:00",
    },

    {
      message: " Facebook API token expired — reconnect required.”",
      time: "2025-01-10T11:00:00",
    },
  ];

  // Set data for pagination
  useEffect(() => {
    setBaseOnTitle(pageItems);
  }, []);

  const pathname = usePathname();
  const pathParts = (pathname || "/").split("/").filter(Boolean);

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

  // Pagination setup
  const itemsPerPage = 10;
  const totalPages = Math.ceil(baseOnTitle.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = baseOnTitle.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="w-full p-7 bg-white  overflow-x-auto rounded-[10px]">
      {/* Header */}
      <div className="flex items-center gap-[14px]">
        <Bredcumb />
      </div>

      {/* Total Notifications */}
      <div>
        <p className="text-[#333333]  text-[16px] font-inter font-semibold mt-[21px]">
          Total {baseOnTitle.length} Notifications
        </p>
      </div>

      {/* Notification List */}
      <div className="mt-6">
        {currentItems.map((item, index) => (
          <div
            key={index}
            className="w-full hover:bg-[#FFCDD3]  transition-all duration-300 py-3 px-[25px] c"
          >
            <div
              onClick={() => setPopOpen(true)}
              className="w-full flex items-center justify-between cursor-pointer"
            >
              <p className="w-[80%] text-[#333333]   text-[16px] font-inter font-semibold">
                {item.message}
              </p>

              <p className="w-[10%] flex justify-end text-[#5C5C5C]  text-[16px] font-inter whitespace-nowrap">
                {timeAgo(item.time)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {/* {popOpen && (
        <div className="fixed inset-0  bg-[#D9D9D9]/80 flex items-center justify-center z-50 ">
          <div className="bg-white rounded-4xl py-14 px-14 w-[30%]  ">

            <div className="flex justify-end mb-5 ">
                <FiX 
                onClick={() => setPopOpen(false)}
                className="h-8 w-8 cursor-pointer"/>
            </div>
            
        <p className="font-inter font-medium">A staff member has requested to void a transaction of +50 points for customer +8801xxxx.</p>

            <div className="flex justify-center items-center gap-12 mt-10">
              <button 
               
              className="border border-[#7AA3CC] text-[#010101] font-medium  font-inter py-3  px-12 rounded-lg cursor-pointer ">
               Approve
              </button>
              <button className="bg-[#ED4539] border border-[#7AA3CC] text-[#010101] font-medium   font-inter py-3 px-12 rounded-lg cursor-pointer ">
                Reject
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Notification;
