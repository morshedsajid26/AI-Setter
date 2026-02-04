import Bredcumb from "@/src/components/Bredcumb";
import LeadDistribution from "@/src/components/LeadDistribution";
import MonthlyPerformance from "@/src/components/MonthlyPerformance";
import PerformanceMetrics from "@/src/components/PerformanceMetrics";
import ProgressCard from "@/src/components/ProgressCard";
import React from "react";
import { GoArrowDownRight, GoArrowUpRight } from "react-icons/go";

const Analytics = () => {
  return (
    <div>
      {/* HEADER */}
      <div>
        <Bredcumb />

        <p className="text-[#606060] font-inter mt-2">
          Track performance and optimize your AI assistant
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-12 gap-6 mt-4">
        <div className="bg-[#FFFFFF] rounded-2xl col-span-12 md:col-span-3 p-4">
          <div className="flex items-center justify-between">
            <p className="font-inter text-[#0F172B]"> Conversation Rate</p>
          </div>
          <p className="font-inter font-medium text-[#0F172B] text-2xl mt-[42px]">
            28.5%
          </p>
          <div className="flex items-center gap-1 mt-2">
            <GoArrowUpRight className=" text-[#00A63E]" />
            <p className="font-inter text-[#00A63E]">+4.2% from last month</p>
          </div>
        </div>

        <div className="bg-[#FFFFFF] rounded-2xl col-span-12 md:col-span-3 p-4">
          <div className="flex items-center justify-between">
            <p className="font-inter text-[#0F172B]">Avg Response Time</p>
          </div>
          <p className="font-inter font-medium text-[#0F172B] text-2xl mt-[42px]">
            1.2s
          </p>
          <div className="flex items-center gap-1 mt-2">
            <GoArrowUpRight className=" text-[#00A63E]" />
            <p className="font-inter text-[#00A63E]">12% faster</p>
          </div>
        </div>

        <div className="bg-[#FFFFFF] rounded-2xl col-span-12 md:col-span-3 p-4">
          <div className="flex items-center justify-between">
            <p className="font-inter text-[#0F172B]">AI Performance</p>
          </div>
          <p className="font-inter font-medium text-[#0F172B] text-2xl mt-[42px]">
            94.8%
          </p>
          <div className="flex items-center gap-1 mt-2">
            <GoArrowUpRight className=" text-[#00A63E]" />
            <p className="font-inter text-[#00A63E]">+2.1% accuracy</p>
          </div>
        </div>

        <div className="bg-[#FFFFFF] rounded-2xl col-span-12 md:col-span-3 p-4">
          <div className="flex items-center justify-between">
            <p className="font-inter text-[#0F172B]">HubSpot Syncs</p>
          </div>
          <p className="font-inter font-medium text-[#0F172B] text-2xl mt-[42px]">
            148
          </p>
          <div className="flex items-center gap-1 mt-2">
            <GoArrowDownRight className=" text-[#E7000B]" />
            <p className="font-inter text-[#E7000B]">3 failed Syncs</p>
          </div>
        </div>

        <div className="bg-[#FFFFFF] rounded-2xl col-span-12 p-6">
          <div className="mb-6">
            <p className="font-inter text-[#0F172B]">Conversion Funnel</p>
            <p className="font-inter text-[#717182] mt-2">
              Track your lead journey from DM to booking
            </p>
          </div>

          <div className="space-y-3">
            <ProgressCard
              title="DMs Received"
              value="1284"
              percent={100}
              dropped={0}
            />
            <ProgressCard
              title="Engaged"
              value="412"
              percent={70}
              dropped={-444}
            />
            <ProgressCard
              title="Qualified"
              value="412"
              percent={50}
              dropped={-444}
            />
            <ProgressCard
              title="Booked"
              value="412"
              percent={25}
              dropped={-444}
            />
          </div>
        </div>

        <div className="bg-[#FFFFFF] rounded-2xl col-span-12 md:col-span-6 p-6">
          <div className="mb-6">
            <p className="font-inter text-[#0A0A0A]">Monthly Performance</p>
            <p className="font-inter text-[#717182] mt-2">
              DMs, qualified leads, and bookings over time
            </p>
          </div>
          <MonthlyPerformance />
        </div>

        <div className="bg-[#FFFFFF] rounded-2xl col-span-12 md:col-span-6 p-6">
          <div className="mb-6">
            <p className="font-inter text-[#0A0A0A]">Source Breakdown</p>
            <p className="font-inter text-[#717182] mt-2">
              Lead distribution by platform
            </p>
          </div>
          <LeadDistribution />
        </div>

        <div className="bg-[#FFFFFF] rounded-2xl col-span-12 p-6">
          <div className="mb-6">
            <p className="font-inter text-[#0A0A0A]">Conversion Funnel</p>
            <p className="font-inter text-[#717182] mt-2">
              Track your lead journey from DM to booking
            </p>
          </div>

          <div className="space-y-3">
            <PerformanceMetrics title="Intent Detection" percent={100} />

            <PerformanceMetrics title="Sentiment Analysis" percent={90} />

            <PerformanceMetrics title="Lead Scoring" percent={80} />

            <PerformanceMetrics title="Response Quality" percent={70} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
