"use client";
import BookingDetails from "@/src/components/BookingDetails";
import BookingList from "@/src/components/BookingList";
import Bredcumb from "@/src/components/Bredcumb";
import React, { useMemo, useState, useEffect } from "react";

// ======== BOOKING DATA ==========
const bookings = [
  {
    id: 1,
    clientName: "John Doe",
    type: "Discovery Call",
    date: "2025-12-07",
    time: "11:00 PM",
    status: "confirmed",
  },
  {
    id: 2,
    clientName: "Jane Smith",
    type: "Discovery Call",
    date: "2025-12-08",
    time: "11:00 AM",
    status: "pending",
  },
  {
    id: 3,
    clientName: "Emma Watson",
    type: "Strategy Call",
    date: "2025-12-10",
    time: "1:00 PM",
    status: "confirmed",
  },
  {
    id: 4,
    clientName: "John Doe",
    type: "Discovery Call",
    date: "2025-12-07",
    time: "11:00 PM",
    status: "confirmed",
  },
  {
    id: 5,
    clientName: "Jane Smith",
    type: "Discovery Call",
    date: "2025-12-08",
    time: "11:00 AM",
    status: "pending",
  },
  {
    id: 6,
    clientName: "Emma Watson",
    type: "Strategy Call",
    date: "2025-12-10",
    time: "1:00 PM",
    status: "confirmed",
  },
];

// ======== DATE HELPERS ==========
function isToday(dateStr) {
  const today = new Date();
  return dateStr === today.toISOString().split("T")[0];
}

function isThisWeek(dateStr) {
  const today = new Date();
  const target = new Date(dateStr);

  const day = today.getDay(); // Sun=0
  const monday = new Date(today);
  monday.setDate(today.getDate() - (day === 0 ? 6 : day - 1));

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  return target >= monday && target <= sunday;
}

function isThisMonth(dateStr) {
  const today = new Date();
  const target = new Date(dateStr);
  return (
    target.getMonth() === today.getMonth() &&
    target.getFullYear() === today.getFullYear()
  );
}

// ======== FIND CLOSEST UPCOMING BOOKING ==========
function getClosestUpcoming(list) {
  const now = new Date();

  const upcoming = list.filter((b) => new Date(b.date) >= now);

  if (upcoming.length === 0) return null;

  return upcoming.sort((a, b) => new Date(a.date) - new Date(b.date))[0];
}

export default function Calendar() {
  const [dateFilter, setDateFilter] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState(null);

  // ======== FILTERED BOOKINGS ==========
  const filteredBookings = useMemo(() => {
    let result = bookings;

    if (dateFilter === "today")
      result = bookings.filter((b) => isToday(b.date));
    if (dateFilter === "week")
      result = bookings.filter((b) => isThisWeek(b.date));
    if (dateFilter === "month")
      result = bookings.filter((b) => isThisMonth(b.date));

    return result;
  }, [dateFilter]);

  // ======== AUTO-SELECT CLOSEST BOOKING ==========
  useEffect(() => {
    const closest = getClosestUpcoming(filteredBookings);
    setSelectedBooking(closest);
  }, [filteredBookings]);

  return (
    <div>
      {/* HEADER */}
      <div>
        <div className="flex items-center gap-2">
          <Bredcumb />
          <span className="font-inter text-[#000000] text-2xl">& Bookings</span>
        </div>
        <p className="text-[#606060] font-inter mt-2">
          Manage your upcoming meetings and calls
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-12 gap-6 mt-8">
        {/* SUMMARY CARDS */}
        <div className="bg-[#FFFFFF] rounded-2xl col-span-3 p-4">
          <p className="font-inter">Today Booking</p>
          <p className="font-inter font-medium text-[#0F172B] text-2xl mt-6">
            {bookings.filter((b) => isToday(b.date)).length}
          </p>
        </div>

        <div className="bg-[#FFFFFF] rounded-2xl col-span-3 p-4">
          <p className="font-inter">This Week</p>
          <p className="font-inter font-medium text-[#0F172B] text-2xl mt-6">
            {bookings.filter((b) => isThisWeek(b.date)).length}
          </p>
        </div>

        <div className="bg-[#FFFFFF] rounded-2xl col-span-3 p-4">
          <p className="font-inter">This Month</p>
          <p className="font-inter font-medium text-[#0F172B] text-2xl mt-6">
            {bookings.filter((b) => isThisMonth(b.date)).length}
          </p>
        </div>

        <div className="bg-[#FFFFFF] rounded-2xl col-span-3 p-4">
          <p className="font-inter">No Show Rate</p>
          <p className="font-inter font-medium text-[#0F172B] text-2xl mt-6">
            4.2%
          </p>
        </div>

        {/* LEFT: BOOKING LIST */}
        <div className="rounded-2xl col-span-8">
          <div className="flex items-center justify-between">
            <p className="font-inter mb-3">Upcoming Bookings</p>

            {/* DATE FILTER BUTTONS */}
            <div className="flex gap-3 mb-4">
              {["today", "week", "month"].map((filter) => (
                <button
                  key={filter}
                  onClick={() =>
                    setDateFilter(dateFilter === filter ? "all" : filter)
                  }
                  className={`px-4 py-2 rounded-lg border font-inter ${
                    dateFilter === filter
                      ? "bg-[#900616] text-white"
                      : "border-[#ccc] text-black"
                  }`}
                >
                  {filter === "today" && "Today"}
                  {filter === "week" && "This Week"}
                  {filter === "month" && "This Month"}
                </button>
              ))}
            </div>
          </div>

          <BookingList
            bookings={filteredBookings}
            onSelect={setSelectedBooking}
            selectedBooking={selectedBooking}
          />
        </div>

        {/* RIGHT: DETAILS PANEL */}
        <div className="bg-[#FFFFFF] rounded-2xl col-span-4 p-4">
          <BookingDetails booking={selectedBooking} />
        </div>
      </div>
    </div>
  );
}
