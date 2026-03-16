"use client";
import Bredcumb from "@/src/components/Bredcumb";
import React, { useEffect, useMemo, useState } from "react";
import { BiExport } from "react-icons/bi";
import { AiOutlineExport } from "react-icons/ai";
import Table from "@/src/components/Table";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaSearch,
  FaYoutube,
} from "react-icons/fa";
import axiosInstance from "@/src/config/axios";
import Cookies from "js-cookie";
import { BASE_URL } from "@/src/config/api";

const Leads = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [rows, setRows] = useState([]);

  /* ---------------- PLATFORM ICONS ---------------- */
  const ICONS = {
    instagram: <FaInstagram className="text-[#E60076] text-2xl" />,
    facebook: <FaFacebookF className="text-[#155DFC] text-2xl " />,
    youtube: <FaYoutube className="text-[#FF0000] text-2xl" />,
  };

  function PlatformCell(platform) {
    return ICONS[platform] || "-";
  }

  /* ---------------- BADGE ---------------- */
  function Badge({ children, color }) {
    const palette = {
      cold: "bg-[#F1F5F9] text-[#314158]",
      nurture: "bg-[#DBEAFE] text-[#1447E6]",
      hot: "bg-[#FFE2E2] text-[#C10007]",
      warm: "bg-[#FEF3C6] text-[#BB4D00]",
      synced: "bg-[#D1FAE5] text-[#047857]",
      not_synced: "ring-1 ring-[#000000]/10",
    };

    return (
      <span className={`inline-flex items-center rounded-full px-5 py-[6px] text-[14px] font-inter ${palette[color]}`}>
        {children}
      </span>
    );
  }

  function StatusCell(status) {
    if (status === "hot") return <Badge color="hot">Hot Lead</Badge>;
    if (status === "warm") return <Badge color="warm">Warm Lead</Badge>;
    if (status === "cold") return <Badge color="cold">Cold Lead</Badge>;
    if (status === "nurture") return <Badge color="nurture">Nurture</Badge>;
    return <Badge color="cold">{status}</Badge>;
  }


  /* ---------------- TABLE HEADS (UNCHANGED) ---------------- */
  const TableHeads = [
    {
      Title: "Name",
      key: "name",
      width: "25%",
      render: (row) => (
        <div className="flex flex-col items-start text-left">
          <span className="font-inter text-[#0F172B] text-base">{row.name}</span>
          {/* <span className="font-inter text-[14px] text-[#6B7280]">
            {row.username}
          </span> */}
        </div>
      ),
    },
    {
      Title: "Platform",
      key: "platform",
      width: "15%",
      render: (row) => PlatformCell(row.platform),
    },
    { Title: "Score", key: "score", width: "15%" },
    {
      Title: "Status",
      key: "status",
      width: "15%",
      render: (row) => StatusCell(row.status),
    },
    { Title: "Source", key: "source", width: "15%" },
    { Title: "Last Contact", key: "last_contact", width: "15%" },
    
  ];

  /* ---------------- FETCH API ---------------- */
  useEffect(() => {
    const fetchLeads = async () => {
      const token = Cookies.get("accessToken");

      const res = await axiosInstance.get(
        `/api/leads/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const mapped = (res.data || []).map((item) => {
        const score = item.score ?? 0;

        return {
          id: item.id,
          name: item.display_name || "Unknown",
          platform: item.platform || "facebook",
          score,
          status: (item.status_display || "").toLowerCase().includes("hot")
            ? "hot"
            : (item.status_display || "").toLowerCase().includes("warm")
            ? "warm"
            : (item.status_display || "").toLowerCase().includes("cold")
            ? "cold"
            : "nurture",
          status_display: item.status_display || "Cold Lead",
          source: item.platform,
          last_contact: item.last_interaction_display || "-",
          
        };
      });

      setRows(mapped);
    };

    fetchLeads();
  }, []);

  /* ---------------- STATS ---------------- */
  const totalLeads = rows.length;
  const hotLeads = rows.filter((r) => r.status === "hot").length;
  const avgScore =
    rows.length === 0
      ? 0
      : Math.round(
          rows.reduce((sum, r) => sum + Number(r.score), 0) / rows.length
        );
  const syncedCount = rows.filter((r) => r.hubspot === "synced").length;

  /* ---------------- FILTER ---------------- */
  const filteredData = useMemo(() => {
    let result = rows;

    if (statusFilter !== "all") {
      result = result.filter((r) => r.status === statusFilter);
    }

    if (searchTerm.trim()) {
      const t = searchTerm.toLowerCase();
      result = result.filter(
        (r) =>
          (r.name || "").toLowerCase().includes(t)
      );
    }

    return result;
  }, [rows, statusFilter, searchTerm]);

  /* ---------------- EXPORT ---------------- */
  const handleExportCSV = () => {
    const headers = TableHeads.map((h) => h.Title);
    const rowsCsv = rows.map((row) =>
      TableHeads.map((h) => row[h.key]).join(",")
    );
    const csv = [headers.join(","), ...rowsCsv].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "leads.csv";
    a.click();
  };

  return (
    <div className="font-inter">
      {/* ---- TOP BAR (UNCHANGED) ---- */}
      <div className="flex items-center justify-between">
        <div>
          <Bredcumb />
          <p className="text-[#606060] font-inter">
            Manage and track your leads from all channels
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={handleExportCSV} className="bg-[#FFFFFF] text-[#0F172B] px-4 py-2 rounded-lg font-inter font-medium flex items-center gap-2">
            <BiExport className="w-6 h-6" /> Export CSV
          </button>
          {/* <button className="bg-[#900616] text-white px-4 py-2 rounded-lg font-inter font-medium flex items-center gap-2">
            <AiOutlineExport className="h-6 w-6" /> Sync to HubSpot
          </button> */}
        </div>
      </div>

      {/* ---- CARDS ---- */}
      <div className="grid grid-cols-12 gap-6 mt-8">
        <div className="bg-[#FFFFFF] text-black  rounded-2xl col-span-6 md:col-span-4  p-4">
          <p>Total Leads</p>
          <p className="text-2xl mt-6">{totalLeads}</p>
        </div>
        <div className="bg-[#FFFFFF] text-black rounded-2xl col-span-6 md:col-span-4  p-4">
          <p>Hot Leads</p>
          <p className="text-2xl mt-6">{hotLeads}</p>
        </div>
        <div className="bg-[#FFFFFF] text-black rounded-2xl col-span-6 md:col-span-4  p-4">
          <p>Avg. score</p>
          <p className="text-2xl mt-6">{avgScore}</p>
        </div>
        {/* <div className="bg-[#FFFFFF] text-black rounded-2xl col-span-6 md:col-span-3  p-4">
          <p>Synced to hubspot</p>
          <p className="text-2xl mt-6">{syncedCount}</p>
        </div> */}

        {/* ---- SEARCH + FILTER (UNCHANGED) ---- */}
        <div className="bg-[#FFFFFF] rounded-2xl col-span-12 p-4 flex flex-col
        md:flex-row justify-between md:gap-40 gap-5 items-center">
          <div className="relative md:w-[50%] w-full">
            <input
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2.5 pl-10 pr-3 bg-[#F3F3F5] text-black placeholder:text-black/50 rounded-lg outline-none"
              placeholder="Search conversations..."
            />
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-black" />
          </div>

          <div className="flex gap-5 md:w-[50%] justify-end">
            {["all", "hot", "warm", "cold", "nurture"].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-4 py-2 border rounded-lg text-black ${
                  statusFilter === s
                    ? "bg-black text-white"
                    : "border-black/10"
                }`}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* ---- TABLE ---- */}
        <div className="bg-[#FFFFFF] rounded-2xl col-span-12 p-4 overflow-auto">
          <Table TableHeads={TableHeads} TableRows={filteredData} />
        </div>
      </div>
    </div>
  );
};

export default Leads;
