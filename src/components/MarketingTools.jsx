import React from "react";
import MarketingToolsCard from "./MarketingToolsCard";
import hubspot from "@/public/hubspot.png";
import kajabi from "@/public/kajabi.png";

export const integrations = [
  {
    id: "hubspot",
    name: "HubSpot",
    description: "Automatically sync leads to your HubSpot CRM",
    icon: hubspot,
    connected: true,
    fields: {
      lastSync: "5 minutes ago",
      pipeline: "Coaching Pipeline",
      defaultStage: "New Lead",
      autoSync: "true",
    },
  },
  {
    id: "kajabi",
    name: "Kajabi",
    description: "Link courses and promotions in conversations",
    icon: kajabi,
    connected: true,
    fields: {
      lastSync: "2 hours ago",
      course: "Wellness Mastery Program",
      autoEnroll: "false",
    },
  },
];

const MarketingTools = () => {
  return (
    <div className="mt-5">
      {integrations.map((item) => (
        <MarketingToolsCard key={item.id} item={item}
         />
      ))}
    </div>
  );
};

export default MarketingTools;
