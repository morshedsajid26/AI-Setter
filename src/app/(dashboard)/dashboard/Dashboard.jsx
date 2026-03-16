"use client";
import Bredcumb from "@/src/components/Bredcumb";
import React, { useEffect, useState } from "react";
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
import axiosInstance from "@/src/config/axios";
import { BASE_URL } from "@/src/config/api";
import Cookies from "js-cookie";

const Dashboard = () => {


  const [dashboardData, setDashboardData] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = Cookies.get("accessToken");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axiosInstance.get(`/api/dashboard-summary/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setDashboardData(res.data);
      } catch (error) {
        console.error("Dashboard fetch error", error);
      } 
    };

    const fetchChartData = async () => {
      try {
        const res = await axiosInstance.get(`/api/dashboard-graph/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setChartData(res.data || []);
      } catch (error) {
        console.error("Chart data fetch error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
    fetchChartData();
  }, []);

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
          {/* <button className="bg-[#900616] text-white px-4 py-2 rounded-lg font-inter font-medium flex items-center gap-2 cursor-pointer">
            <FaPlus />
            Connect Channel
          </button> */}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-5 mt-4">
        <div className="bg-[#FFFFFF] rounded-2xl col-span-6 md:col-span-3  p-4">
          <div className="flex items-center justify-between">
            <p className="font-inter text-[#0F172B] ">Total Messages</p>
            <LuMessageSquare className="w-6 h-6 text-[#0F172B]" />
          </div>
          <p className="font-inter font-medium text-[#0F172B] text-2xl mt-[42px]">
            {dashboardData?.total_user_messages ?? 0}
          </p>
          {/* <div className="flex items-center gap-1 mt-2">
            <GoArrowUpRight className=" text-[#00A63E]" />
            <p className="font-inter text-[#00A63E]">12%</p>
          </div> */}
        </div>

        <div className="bg-[#FFFFFF] rounded-2xl col-span-6 md:col-span-3  p-4">
          <div className="flex items-center justify-between">
            <p className="font-inter text-[#0F172B] ">Leads Identified</p>
            <FiUsers className="w-6 h-6 text-[#0F172B]" />
          </div>
          <p className="font-inter font-medium text-[#0F172B] text-2xl mt-[42px]">
            {dashboardData?.potential_leads ?? 0}
          </p>
          {/* <div className="flex items-center gap-1 mt-2">
            <GoArrowUpRight className=" text-[#00A63E]" />
            <p className="font-inter text-[#00A63E]">8%</p>
          </div> */}
        </div>

        <div className="bg-[#FFFFFF] rounded-2xl col-span-6 md:col-span-3  p-4">
          <div className="flex items-center justify-between">
            <p className="font-inter text-[#0F172B] ">Bookings</p>
            <IoCalendarOutline className="w-6 h-6 text-[#0F172B]" />
          </div>
          <p className="font-inter font-medium text-[#0F172B] text-2xl mt-[42px]">
          {dashboardData?.bookings ?? 0}
          </p>
          {/* <div className="flex items-center gap-1 mt-2">
            <GoArrowUpRight className=" text-[#00A63E]" />
            <p className="font-inter text-[#00A63E]">18%</p>
          </div> */}
        </div>

        <div className="bg-[#FFFFFF] rounded-2xl col-span-6 md:col-span-3  p-4">
          <div className="flex items-center justify-between">
            <p className="font-inter text-[#0F172B]">Conversion Rate</p>
            <IoCalendarOutline className="w-6 h-6 text-[#0F172B]" />
          </div>
          <p className="font-inter font-medium text-[#0F172B] text-2xl mt-[42px]">
           {dashboardData?.conversation_rate?? 0}
          </p>
          {/* <div className="flex items-center gap-1 mt-2">
            <GoArrowDownRight className=" text-[#E7000B]" />
            <p className="font-inter text-[#E7000B]">12%</p>
          </div> */}
        </div>

        <div className="bg-[#FFFFFF] rounded-2xl  col-span-12  p-4">
          <p className="font-inter text-[#0A0A0A]">Message Volume</p>
          <p className="font-inter text-[#717182] mt-1 mb-8"> Messages received over the last 7 days</p>

          <MessageVolumeChart  data={chartData} />
        </div>
      

        <div className="bg-[#FFFFFF] rounded-lg col-span-12 p-4">
          <RecentActivity />
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;
