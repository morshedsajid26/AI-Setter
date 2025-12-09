import React from "react";
import Table from "./Table";
import { FiRefreshCcw } from "react-icons/fi";

// TABLE COLUMNS
const TableHeads = [
  { Title: "Service", key: "service", width: "20%" },
  { Title: "Status", key: "status", width: "10%" },
  { Title: "Token Expiry", key: "token", width: "10%" },
  { Title: "Last Handshake", key: "handshake", width: "10%" },
  { Title: "Calls/min", key: "calls", width: "10%" },
  { Title: "API Token", key: "api_token", width: "15%" },
  { Title: "Actions", key: "action", width: "15%" },
];

// REAL DATA (you can fetch from API later)
const rawData = [
  {
    service: "WhatsApp Business API",
    status: "connected",
    expiry: 45,
    handshake: "2 min ago",
    calls: 127,
    token: "************",
  },
  {
    service: "Facebook Messenger",
    status: "connected",
    expiry: 12,
    handshake: "5 min ago",
    calls: 89,
    token: "************",
  },
  {
    service: "HubSpot CRM",
    status: "error",
    expiry: "expired",
    handshake: "3 days ago",
    calls: 0,
    token: "************",
  },
  {
    service: "Instagram Messaging",
    status: "connected",
    expiry: 89,
    handshake: "1 min ago",
    calls: 234,
    token: "************",
  },
  {
    service: "WhatsApp Business API",
    status: "connected",
    expiry: 3,
    handshake: "8 min ago",
    calls: 45,
    token: "************",
  },
];

// CONVERT RAW DATA INTO TABLE ROWS WITH JSX
const TableRows = rawData.map((item) => {
  // STATUS DOT COLOR
  const statusColor =
    item.status === "connected"
      ? "bg-green-500"
      : item.status === "warning"
      ? "bg-orange-500"
      : "bg-red-500";

  // STATUS TEXT
  const statusText =
    item.status === "connected" ? (
      <span className="text-[#0b9241] p-1 rounded-md font-medium bg-[#d0f8e0]">Connected</span>
    ) : (
      <span className="text-[#db1111] bg-[#f7d5d5] px-6 py-1 rounded-md  font-medium">Error</span>
    );

  // EXPIRY COLOR
  const expiryColor =
    item.expiry === "expired"
      ? "text-red-500"
      : item.expiry < 10
      ? "text-orange-500"
      : "text-gray-700";

  const expiryLabel =
    item.expiry === "expired" ? "Expired" : `${item.expiry} days`;

  return {
    service: item.service,

    // STATUS CELL (DOT + TEXT)
    status: (
      <div className="flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${statusColor}`}></span>
        {statusText}
      </div>
    ),

    // TOKEN EXPIRY
    token: <span className={`font-medium ${expiryColor}`}>{expiryLabel}</span>,

    handshake: item.handshake,
    calls: item.calls,

    // API TOKEN MASKED INPUT
    api_token: (
      <input
        type="password"
       
        // value={item.token}
        className="bg-gray-100 px-3 py-1 rounded-lg outline-none"
      />
    ),

    // ACTION BUTTONS
    action: (
      <div className="flex gap-2 ">
        {item.expiry === "expired" && (
          <button className="px-3 py-1 bg-gray-100 rounded-lg flex items-center gap-1">
            <FiRefreshCcw size={14} /> Resync
          </button>
        )}
        <button className="px-3 py-1 bg-gray-100 rounded-lg">Revoke</button>
      </div>
    ),
  };
});

const IntegrationTable = () => {
  return (
    <div>
      <Table TableHeads={TableHeads} TableRows={TableRows} />
    </div>
  );
};

export default IntegrationTable;
