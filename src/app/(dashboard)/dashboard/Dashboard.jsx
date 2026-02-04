import Bredcumb from "@/src/components/Bredcumb";
import React from "react";
import { FaPlus } from "react-icons/fa";
import { LuMessageSquare } from "react-icons/lu";
import { GoArrowDownRight, GoArrowUpRight } from "react-icons/go";
import { FiUsers } from "react-icons/fi";
import { IoCalendarOutline } from "react-icons/io5";
import MessageVolumeChart from "@/src/components/MessageVolumeChart";
import WeeklyBookingBar from "@/src/components/WeeklyBooking";
import RecentActivity from "@/src/components/RecentActivity";
import { SiTicktick } from "react-icons/si";
import ChannelConnect from "@/src/components/ChannelConnect";

const Dashboard = () => {
  return (
    <div>
      <div className=" flex items-center justify-between">
        <div>
          <Bredcumb />
          <p className="text-[#606060] font-inter mt-2">
            Welcome back! Here's what's happening today.
          </p>
        </div>
        <div>
          <button className="bg-[#900616] text-white px-4 py-2 rounded-lg font-inter font-medium flex items-center gap-2 cursor-pointer">
            <FaPlus />
            Connect Channel
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-5 mt-4">
        <div className="bg-[#FFFFFF] rounded-2xl col-span-6 md:col-span-3  p-4">
          <div className="flex items-center justify-between">
            <p className="font-inter text-[#0F172B] ">Total Messages</p>
            <LuMessageSquare className="w-6 h-6 text-[#0F172B]" />
          </div>
          <p className="font-inter font-medium text-[#0F172B] text-2xl mt-[42px]">
            1,200
          </p>
          <div className="flex items-center gap-1 mt-2">
            <GoArrowUpRight className=" text-[#00A63E]" />
            <p className="font-inter text-[#00A63E]">12%</p>
          </div>
        </div>

        <div className="bg-[#FFFFFF] rounded-2xl col-span-6 md:col-span-3  p-4">
          <div className="flex items-center justify-between">
            <p className="font-inter text-[#0F172B] ">Leads Identified</p>
            <FiUsers className="w-6 h-6 text-[#0F172B]" />
          </div>
          <p className="font-inter font-medium text-[#0F172B] text-2xl mt-[42px]">
            20
          </p>
          <div className="flex items-center gap-1 mt-2">
            <GoArrowUpRight className=" text-[#00A63E]" />
            <p className="font-inter text-[#00A63E]">8%</p>
          </div>
        </div>

        <div className="bg-[#FFFFFF] rounded-2xl col-span-6 md:col-span-3  p-4">
          <div className="flex items-center justify-between">
            <p className="font-inter text-[#0F172B] ">Bookings</p>
            <IoCalendarOutline className="w-6 h-6 text-[#0F172B]" />
          </div>
          <p className="font-inter font-medium text-[#0F172B] text-2xl mt-[42px]">
           53
          </p>
          <div className="flex items-center gap-1 mt-2">
            <GoArrowUpRight className=" text-[#00A63E]" />
            <p className="font-inter text-[#00A63E]">18%</p>
          </div>
        </div>

        <div className="bg-[#FFFFFF] rounded-2xl col-span-6 md:col-span-3  p-4">
          <div className="flex items-center justify-between">
            <p className="font-inter text-[#0F172B]">Conversion Rate</p>
            <IoCalendarOutline className="w-6 h-6 text-[#0F172B]" />
          </div>
          <p className="font-inter font-medium text-[#0F172B] text-2xl mt-[42px]">
            1,200
          </p>
          <div className="flex items-center gap-1 mt-2">
            <GoArrowDownRight className=" text-[#E7000B]" />
            <p className="font-inter text-[#E7000B]">12%</p>
          </div>
        </div>

        <div className="bg-[#FFFFFF] rounded-2xl  col-span-12 md:col-span-6 p-4">
          <p className="font-inter text-[#0A0A0A]">Message Volume</p>
          <p className="font-inter text-[#717182] mt-1 mb-8"> Messages received over the last 7 days</p>

          <MessageVolumeChart />
        </div>
        <div className="bg-[#FFFFFF] rounded-2xl col-span-12 md:col-span-6 p-4">
          <p className="font-inter text-[#0A0A0A]">Bookings Over Time</p>
          <p className="font-inter text-[#717182] mt-1 mb-8"> Weekly booking trends this month</p>

          <WeeklyBookingBar/>
        </div>

        <div className="bg-[#FFFFFF] rounded-lg col-span-12 md:col-span-8 p-4">
          <RecentActivity />
        </div>
        <div className=" col-span-12 md:col-span-4 ">
          <div className="bg-[#FFFFFF] rounded-lg p-6">

            <ChannelConnect/>
          </div>


          <div className="bg-[#FFFFFF] rounded-lg mt-5 p-6">
            <p className="font-inter text-[#0A0A0A]">
              Quick Actions
            </p>

            <div>
              <button className="font-inter text-[#0A0A0A] mt-7 w-full border border-gray-300 rounded-lg px-3 py-2 text-left flex items-center gap-2 cursor-pointer">
                <SiTicktick className="w-4 h-4" />
                Reconnect HubSpot
              </button>
              <button className="font-inter text-[#0A0A0A] mt-4 w-full border border-gray-300 rounded-lg px-3 py-2 text-left flex items-center gap-2 cursor-pointer">
                <FiUsers className="w-4 h-4" />
                Export Leads CSV
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
