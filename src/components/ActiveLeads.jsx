"use client";
import React from "react";
import { FiMail, FiPhone, FiMapPin, FiBriefcase } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { AiOutlineExport } from "react-icons/ai";
import { FiCalendar } from "react-icons/fi";

export default function ActiveLeads({ data }) {
  if (!data) {
    return (
      <div className="flex items-center justify-center text-gray-400 h-full ">
        Select a lead to view details
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-white h-[85vh] font-inter overflow-scroll hide-scrollbar">
      {/* Title */}
      <div>
        <h2 className="font-semibold text-lg text-[#0F172A]">Lead Details</h2>
        <p className="text-sm text-[#94A3B8]">CRM Information</p>
      </div>

      {/* LEAD SCORE */}
      <div>
        <p className="text-sm font-medium text-[#0F172A]">Lead Score</p>
        <div className="flex items-center gap-3 mt-2">
          <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
            {data.leadScore}/100
          </span>
        </div>

        {/* Score bar */}
        <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
          <div
            className="h-2 bg-[#900616] rounded-full"
            style={{ width: `${data.leadScore}%` }}
          ></div>
        </div>
      </div>

      {/* TAGS */}
      <div>
        <p className="text-sm font-medium text-[#0F172A] mb-2">Tags</p>

        <div className="flex gap-2 flex-wrap">
          {data.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1 border rounded-full text-sm bg-[#F8FAFC] text-[#0F172A]"
            >
              {tag}
            </span>
          ))}
          <button className="px-3 py-1 border rounded-full text-sm text-[#475569] bg-white">
            + Add
          </button>
        </div>
      </div>

      {/* CONTACT INFO */}
      <div>
        <p className="text-sm font-medium text-[#0F172A] mb-3">
          Contact Information
        </p>

        <div className="space-y-2 text-[#334155]">
          <div className="flex items-center gap-2">
            <FaUser className="text-[#64748B]" />
            <span>{data.contact.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <FiMail className="text-[#64748B]" />
            <span>{data.contact.email}</span>
          </div>

          <div className="flex items-center gap-2">
            <FiPhone className="text-[#64748B]" />
            <span>{data.contact.phone}</span>
          </div>

          <div className="flex items-center gap-2">
            <FiMapPin className="text-[#64748B]" />
            <span>{data.contact.location}</span>
          </div>

          <div className="flex items-center gap-2">
            <FiBriefcase className="text-[#64748B]" />
            <span>{data.contact.jobTitle}</span>
          </div>
        </div>
      </div>

      {/* NOTES */}
      <div>
        <p className="text-sm font-medium text-[#0F172A] mb-2">Notes</p>
        <textarea
          className="w-full p-3 rounded-lg bg-[#F5F6F8] text-sm text-[#475569] outline-none resize-none"
          placeholder="Add notes about this lead..."
          rows={3}
        />
      </div>

      {/* LAST INTERACTIONS */}
      <div>
        <p className="text-sm font-medium text-[#0F172A] mb-2">
          Last Interactions
        </p>

        <div className="space-y-3">
          {data.lastInteractions.map((item, i) => (
            <div
              key={i}
              className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]"
            >
              <p className="text-sm text-[#0F172A]">{item.label}</p>
              <p className="text-xs text-[#94A3B8]">{item.time}</p>
            </div>
          ))}
        </div>
      </div>

      {/* BUTTONS */}
      <div className="space-y-3 pt-4">
        <button className="w-full bg-[#900616] text-white py-3 rounded-lg flex items-center justify-center gap-2 font-medium">
          <AiOutlineExport className="h-6 w-6" /> Sync to HubSpot
        </button>

        <button className="w-full border py-3 rounded-lg font-medium text-[#0F172A] flex items-center justify-center gap-2">
          <FiCalendar className="w-6 h-6" />
          Book Meeting
        </button>
      </div>
    </div>
  );
}
