import React from 'react'
import { FaCalendarAlt, FaClock, FaVideo } from 'react-icons/fa';

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

/* ----------------- FIXED BOOKING CARD -------------------- */
const BookingCard = ({ booking, onSelect ,isActive}) => {
  const initials = booking.clientName
    .split(" ")
    .map((w) => w[0])
    .join("");

  const readableDate = getReadableDate(booking.date);

  return (
    <div
      onClick={() => onSelect(booking)}
      className={`bg-white p-5 rounded-xl cursor-pointer flex flex-col justify-between font-inter
        border transition-all duration-200
        ${isActive ? "border-[#900616]" : "border-transparent hover:border-[#900616]"}
      `}
    >
      <div className="flex justify-between items-center">
        {/* Left */}
        <div className="flex gap-4">
          <div className="w-12 h-12 bg-[#BE0016] text-white rounded-full flex items-center justify-center">
            {initials}
          </div>

          <div className="flex flex-col">
            <h3 className="font-medium text-[#0F172B]">{booking.clientName}</h3>
            <p className="text-[#45556C] text-sm">{booking.type}</p>
          </div>
        </div>

        {/* Status */}
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

      {/* Bottom section */}
      <div className="mt-4 grid grid-cols-2 gap-2 text-[#45556C] text-sm">
        <div className="flex items-center gap-2">
          <FaCalendarAlt />
          <span>{readableDate}</span>
        </div>

        <div className="flex items-center gap-2">
          <FaClock />
          <span>{booking.time}</span>
        </div>

        <div className="flex items-center gap-2">
          <FaVideo />
          <span>Zoom</span>
        </div>

        <span className="text-[#900616] cursor-pointer">
          Join Meeting ↗
        </span>
      </div>
    </div>
  );
};

/* ----------------- BOOKING LIST -------------------- */
const BookingList = ({ bookings, onSelect ,selectedBooking }) => {
  return (
    <div className="space-y-4  overflow-scroll hide-scrollbar h-[56vh] "
    
    >
        {bookings.map((booking) => (
       <BookingCard
  key={booking.id}
  booking={booking}
  onSelect={onSelect}
  isActive={selectedBooking?.id === booking.id}
/>
      ))}
    </div>
  );
};

export default BookingList;
