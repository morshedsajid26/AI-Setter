import React from "react";
import { FaCalendarAlt, FaClock, FaVideo } from "react-icons/fa";

function getReadableDate(dateStr) {
  const today = new Date();
  const target = new Date(dateStr);

  const todayStr = today.toISOString().split("T")[0];
  const targetStr = target.toISOString().split("T")[0];

  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split("T")[0];

  if (targetStr === todayStr) return "Today";
  if (targetStr === tomorrowStr) return "Tomorrow";

  return dateStr;
}

export default function BookingDetails({ booking }) {
  if (!booking) {
    return (
      <div className="font-inter text-center text-[#606060] mt-10">
        Select a booking to see details
      </div>
    );
  }

  const initials = booking.clientName
    .split(" ")
    .map((w) => w[0])
    .join("");

  const readableDate = getReadableDate(booking.date);

  return (
    <div className="font-inter  h-[59vh] overflow-scroll hide-scrollbar ">
      <h2 className="text-lg font-medium mb-4">Booking Details</h2>

      {/* CLIENT */}
      <p className="text-[#45556C] mb-2">Client</p>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-[#BE0016] text-white rounded-full flex items-center justify-center">
          {initials}
        </div>
        <div>
          <p className="text-[#0F172B] font-medium">{booking.clientName}</p>
          <p className="text-sm text-[#45556C]">{booking.type}</p>
        </div>
      </div>

      {/* DATE & TIME */}
      <div className="mb-6">
        <p className="text-sm text-[#45556C] mb-2">Date & Time</p>

        <div className="flex items-center gap-2 mb-2">
          <FaCalendarAlt className="text-[#45556C]" />
          <span>{readableDate}</span>
        </div>

        <div className="flex items-center gap-2">
          <FaClock className="text-[#45556C]" />
          <span>{booking.time} </span>
        </div>
      </div>

      {/* MEETING LINK */}
      <div className="mb-6">
        <p className="text-sm text-[#45556C] mb-2">Meeting Link</p>
        <div className="bg-[#F3F6FA] px-4 py-3 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#606060] text-sm">
            <FaVideo />
            <span>zoom.us/j/123456</span>
          </div>
          <a href={booking.link} target="_blank" className="text-[#900616]">
            ↗
          </a>
        </div>
      </div>

      {/* STATUS */}
      <div className="mb-6">
        <p className="text-sm text-[#45556C] mb-2">Status</p>
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            booking.status === "confirmed"
              ? "bg-[#DCFCE7] text-[#008236]"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
        </span>
      </div>

      {/* NOTES */}
      <div className="mb-6">
        <p className="text-sm text-[#45556C] mb-2">Notes</p>
        <div className="bg-[#F3F6FA] px-4 py-3 rounded-xl text-sm text-[#606060]">
          {booking.notes || "No notes added."}
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <button className="w-full py-3 bg-[#900616] text-white rounded-lg font-medium mb-3">
        Join Meeting
      </button>

      <button className="w-full py-3 border rounded-lg mb-3">Reschedule</button>

      <button className="w-full py-3  text-[#C10007] font-medium">
        Cancel Booking
      </button>
    </div>
  );
}
