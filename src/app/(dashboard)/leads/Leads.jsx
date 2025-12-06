"use client";
import Bredcumb from "@/src/components/Bredcumb";
import React, { useMemo, useState } from "react";
import { BiExport } from "react-icons/bi";
import { AiOutlineExport } from "react-icons/ai";
import Table from "@/src/components/Table";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaSearch } from "react-icons/fa";

const Leads = () => {

    const [statusFilter, setStatusFilter] = useState("all");
      const [searchTerm, setSearchTerm] = useState("");
  // PLATFORM ICONS
  const ICONS = {
    instagram: <FaInstagram className="text-[#E60076] text-2xl" />,
    facebook: <FaFacebookF className="text-[#155DFC] text-2xl " />,
    linkedin: <FaLinkedinIn className="text-[#1447E6] text-2xl" />,
  };

  function PlatformCell(platform) {
    return ICONS[platform] || "-";
  }

  // BADGE COMPONENT
  function Badge({ children, color }) {
    const palette = {
      cold: "bg-[#F1F5F9] text-[#314158]",
      nurture: "bg-[#DBEAFE] text-[#1447E6] ",
      hot: "bg-[#FFE2E2] text-[#C10007] ",
      warm: "bg-[#FEF3C6] text-[#BB4D00]",
      synced: "bg-[#D1FAE5] text-[#047857]",
      not_synced: "ring-1 ring-[#000000]/10 ",
    };

    const cls = palette[color] || palette.yellow;

    return (
      <span
        className={`inline-flex items-center rounded-full px-5 py-[6px] text-[14px] font-inter ${cls}`}
      >
        {children}
      </span>
    );
  }

  function StatusCell(status) {
    const s = status?.toLowerCase();

    if (s === "hot") return <Badge color="hot">Hot Lead</Badge>;
    if (s === "warm") return <Badge color="warm">Warm Lead</Badge>;
    if (s === "cold") return <Badge color="cold">Cold Lead</Badge>;
    if (s === "nurture") return <Badge color="nurture">Nurture</Badge>;
    

    return <Badge color="cold">{status}</Badge>;
  }

    function HubSpotCell(hubspot) {
    const s = hubspot?.toLowerCase();

    if (s === "synced") return <Badge  color="synced">Synced</Badge>;
    if (s === "not synced") return <Badge color="not_synced">Not Synced</Badge>;
    
    

    return <Badge color="synced">{hubspot}</Badge>;
  }

  // TABLE HEADERS WITH RENDER FUNCTIONS
  const TableHeads = [
    {
  Title: "Name",
  key: "name",
  width: "14%",
  render: (row) => (
    <div className="flex flex-col items-start text-left">
      <span className="font-inter  text-[#0F172B] ">
        {row.name}
      </span>

      <span className="font-inter text-[14px] text-[#6B7280]">
        {row.username}
      </span>
    </div>
  )
},

    {
      Title: "Platform",
      key: "platform",
      width: "10%",
      render: (row) => PlatformCell(row.platform),
    },

    { Title: "Score", key: "score", width: "10%" },

    {
      Title: "Status",
      key: "status",
      width: "10%",
      render: (row) => StatusCell(row.status),
    },

    { Title: "Source", key: "source", width: "10%" },
    { Title: "Last Contact", key: "last_contact", width: "10%" },
      {
      Title: "Status",
      key: "status",
      width: "10%",
      render: (row) => HubSpotCell(row.hubspot)
    },
  ];

  // ROWS
  const TableRows = [
  {
    name: "Sarah Martinez",
    username: "@sarah_m",
    platform: "facebook",
    score: "82",
    status: "hot",
    source: "Ad Campaign",
    last_contact: "2023-10-01",
    hubspot: "Synced",
  },
  {
    name: "James Anderson",
    username: "@james.anderson",
    platform: "instagram",
    score: "74",
    status: "warm",
    source: "Organic",
    last_contact: "2023-11-20",
    hubspot: "Not Synced",
  },
  {
    name: "Emily Carter",
    username: "@emily.c",
    platform: "linkedin",
    score: "55",
    status: "cold",
    source: "Referral",
    last_contact: "2023-09-10",
    hubspot: "Synced",
  },
  {
    name: "Michael Howard",
    username: "@mhoward",
    platform: "facebook",
    score: "91",
    status: "hot",
    source: "Website Form",
    last_contact: "2023-12-05",
    hubspot: "Pending",
  },
  {
    name: "Olivia Bennett",
    username: "@olivia.b",
    platform: "instagram",
    score: "63",
    status: "warm",
    source: "Influencer Promo",
    last_contact: "2023-10-18",
    hubspot: "Synced",
  },
  {
    name: "Daniel Wright",
    username: "@danielwright",
    platform: "linkedin",
    score: "47",
    status: "nurture",
    source: "Cold Outreach",
    last_contact: "2023-08-12",
    hubspot: "Not Synced",
  },
  {
    name: "Sophia Turner",
    username: "@sophia.t",
    platform: "facebook",
    score: "78",
    status: "warm",
    source: "Local Ads",
    last_contact: "2023-11-02",
    hubspot: "Pending",
  },
  {
    name: "Ethan Walker",
    username: "@ethanwalker",
    platform: "instagram",
    score: "88",
    status: "hot",
    source: "Website Signup",
    last_contact: "2023-12-10",
    hubspot: "Synced",
  },
  {
    name: "Ava Mitchell",
    username: "@ava.mitchell",
    platform: "linkedin",
    score: "52",
    status: "cold",
    source: "Email Outreach",
    last_contact: "2023-07-29",
    hubspot: "Not Synced",
  },
  {
    name: "Noah Robinson",
    username: "@noah.robinson",
    platform: "facebook",
    score: "69",
    status: "nurture",
    source: "Referral",
    last_contact: "2023-09-25",
    hubspot: "Synced",
  },
];

const sortedData = useMemo(() => {
    return [...TableRows].sort(
      (a, b) => b.score - a.score
    );
  }, []);

  // FILTER
  const filteredData = useMemo(() => {
  let result = sortedData;

  if (statusFilter !== "all") {
    result = result.filter((item) => item.status === statusFilter);
  }

  if (searchTerm.trim()) {
    const t = searchTerm.toLowerCase();
    result = result.filter(
      (item) =>
        (item.name || "").toLowerCase().includes(t) ||
        (item.username || "").toLowerCase().includes(t) ||
        (item.status || "").toLowerCase().includes(t)
    );
  }

  return result;
}, [statusFilter, searchTerm, sortedData]);
 const handleExportCSV = () => {
    const headers = TableHeads.map((h) => h.Title);
    const rows = TableRows.map((row) =>
      TableHeads.map((h) => row[h.key]).join(",")
    );

    const csvContent = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "leads.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      {/* TOP BAR */}
      <div className="flex items-center justify-between">
        <div>
          <Bredcumb />
          <p className="text-[#606060] font-inter">
            Manage and track your leads from all channels
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button
          onClick={handleExportCSV}
          className="bg-[#FFFFFF] px-4 py-2 rounded-lg font-inter font-medium flex items-center gap-2 cursor-pointer">
            <BiExport className="w-6 h-6" />
            Export CSV
          </button>
          <button className="bg-[#900616] text-white px-4 py-2 rounded-lg font-inter font-medium flex items-center gap-2 cursor-pointer">
            <AiOutlineExport className="h-6 w-6" />
            Sync to HubSpot
          </button>
        </div>
      </div>

      {/* CARDS + TABLE */}
      <div className="grid grid-cols-12 gap-6 mt-8">
        <div className="bg-[#FFFFFF] rounded-2xl col-span-3 p-4">
          <p className="font-inter ">Total Leads</p>
          <p className="font-inter font-medium text-[#0F172B] text-2xl mt-6">200</p>
        </div>

        <div className="bg-[#FFFFFF] rounded-2xl col-span-3 p-4">
          <p className="font-inter ">Hot Leads</p>
          <p className="font-inter font-medium text-[#0F172B] text-2xl mt-6">5</p>
        </div>

        <div className="bg-[#FFFFFF] rounded-2xl col-span-3 p-4">
          <p className="font-inter ">Avg. score</p>
          <p className="font-inter font-medium text-[#0F172B] text-2xl mt-6">77</p>
        </div>

        <div className="bg-[#FFFFFF] rounded-2xl col-span-3 p-4">
          <p className="font-inter ">Synced to hubspot</p>
          <p className="font-inter font-medium text-[#0F172B] text-2xl mt-6">6</p>
        </div>

        <div className="bg-[#FFFFFF] rounded-2xl col-span-12 p-4  flex justify-between gap-40  items-center">
        <div className="relative w-[50%]">
                <input
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-2.5 pl-10 pr-3  bg-[#F3F3F5] rounded-lg placeholder:text-[#717182] outline-none "
                  placeholder="Search conversations..."
                />
        
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#717182]"/>
              </div>

       <div className="flex  gap-5 w-[50%] justify-end font-inter">

  {/* All */}
  <button
    onClick={() => setStatusFilter("all")}
    className={`px-4 py-2 border rounded-lg cursor-pointer ${
      statusFilter === "all"
        ? "bg-black text-white"
        : "border-black/10 text-[#0A0A0A]"
    }`}
  >
    All
  </button>

  {/* Hot */}
  <button
    onClick={() => setStatusFilter("hot")}
    className={`px-4 py-2 border rounded-lg cursor-pointer ${
      statusFilter === "hot"
        ? "bg-black text-white"
        : "border-black/10 text-[#0A0A0A]"
    }`}
  >
    Hot
  </button>

  {/* Warm */}
  <button
    onClick={() => setStatusFilter("warm")}
    className={`px-4 py-2 border rounded-lg cursor-pointer ${
      statusFilter === "warm"
        ? "bg-black text-white"
        : "border-black/10 text-[#0A0A0A]"
    }`}
  >
    Warm
  </button>

  {/* Cold */}
  <button
    onClick={() => setStatusFilter("cold")}
    className={`px-4 py-2 border rounded-lg cursor-pointer ${
      statusFilter === "cold"
        ? "bg-black text-white"
        : "border-black/10 text-[#0A0A0A]"
    }`}
  >
    Cold
  </button>

  {/* Nurture */}
  <button
    onClick={() => setStatusFilter("nurture")}
    className={`px-4 py-2 border rounded-lg cursor-pointer ${
      statusFilter === "nurture"
        ? "bg-black text-white"
        : "border-black/10 text-[#0A0A0A]"
    }`}
  >
    Nurture
  </button>
</div>


        </div>

        <div className="bg-[#FFFFFF] rounded-2xl col-span-12 p-4">
          <Table TableHeads={TableHeads} TableRows={filteredData} />

        </div>
      </div>
    </div>
  );
};

export default Leads;
