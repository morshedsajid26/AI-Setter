import Bredcumb from "@/src/components/Bredcumb";
import IntegrationTable from "@/src/components/IntegrationTable";
import MarketingTools from "@/src/components/MarketingTools";
import ScheduleCalendar from "@/src/components/ScheduleCalendar";
import SocialMediaChannels from "@/src/components/SocialMediaChannels";
import React from "react";

const Integrations = () => {
  return (
    <div>
      <div>
        <Bredcumb />
        <p className="text-[#606060] font-inter mt-2">
          Connect your social channels, CRM, and tools, API
        </p>
      </div>

      <div className="mt-8">
        <p className="font-inter text-[#0F172B] font-semibold">
          Social Media Channels
        </p>
        <SocialMediaChannels />
      </div>

      <div className="mt-8">
        <p className="font-inter text-[#0F172B] font-semibold">
          CRM & Marketing Tools
        </p>
        <MarketingTools />
      </div>

      <div className="mt-8">
        <p className="font-inter text-[#0F172B] font-semibold">
          Scheduling & Calendar
        </p>
        <ScheduleCalendar />
      </div>

      <div className="mt-8">
        <p className="font-inter text-[#0F172B] font-semibold">
          Active Integrations
        </p>
        <div className="bg-white p-6 rounded-2xl mt-5 overflow-auto">
          <IntegrationTable />
        </div>
      </div>
    </div>
  );
};

export default Integrations;
