"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";

import { LuLayoutDashboard } from "react-icons/lu";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { IoCalendarOutline } from "react-icons/io5";
import { MdOutlineAnalytics } from "react-icons/md";
import { LuPlug } from "react-icons/lu";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineSupportAgent } from "react-icons/md";
// import { FiLogOut } from "react-icons/fi";
import logout from "@/public/logout.png";

const navitems = [
  {
    name: "Dashboard",
    link: "/dashboard",
    icon: LuLayoutDashboard,
  },
  {
    name: "Conversations",
    link: "/staff/redeem/add",
    icon: IoChatbubbleEllipsesOutline,
  },
  {
    name: "Leads",
    link: "/staff/transaction",
    icon: FiUsers ,
  },
  {
    name: "Calendar",
    link: "/staff/push/notification",
    icon: IoCalendarOutline,
  },
  {
    name: "Analytics",
    link: "/staff/manage/reward",
    icon: MdOutlineAnalytics,
  },
  {
    name: "AI Settings",
    link: "/staff/platform/settings",
    icon: IoSettingsOutline ,
  },
  {
    name: "API & Integration",
    link: "/staff/profile",
    icon: LuPlug,
  },
  {
    name: "Account",
    link: "/staff/account",
    icon: FaRegUser,
  },
  {
    name: "Help & Support",
    link: "/staff/support",
    icon: IoIosHelpCircleOutline,
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 🔹 Toggle Button (visible on small screens) */}
      <button
        className="2xl:hidden fixed top-5 left-5 z-50 p-2 bg-[#7008E7] text-white rounded-lg cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* 🔹 Sidebar */}
      <div
        className={`fixed 2xl:static top-0 left-0 z-40 h-screen w-[241px] shrink-0 flex flex-col justify-between pl-2.5 pr-5 py-7 bg-[#FFFFFF] 
        transition-transform  duration-300 ease-in-out overflow-scroll hide-scrollbar
        ${isOpen ? "translate-x-0 " : "-translate-x-full 2xl:translate-x-0"}`}
      >
        {/* Logo */}
        <div className="flex justify-center ">
          {/* <Image src={logo} alt="logo" /> */}
          <h3 className="font-inter text-[32px] font-bold">LOGO</h3>
        </div>

        {/* Nav Items */}
        <ul className="flex flex-col gap-6 overflow-scroll hide-scrollbar ">
          {navitems.map((item, index) => {
            const isActive =
              pathname === item.link || pathname.startsWith(item.link + "/");

            const Icon = item.icon;
            return (
              <Link
                href={item.link}
                key={index}
                onClick={() => setIsOpen(false)} // auto close on mobile
                className={`py-2 px-2 font-inter font-medium flex items-center gap-4 cursor-pointer rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-[#D3CAFF] text-[#7008E7]"
                    : "text-[#000000] hover:bg-[#D3CAFF] hover:text-[#7008E7]"
                }`}
              >
                <Icon
                  size={24}
                  className="
            transition 
            group-hover:text-[#7008E7]
          "
                />

                {item.name}
              </Link>
            );
          })}
        </ul>

        {/* Logout */}
        <div className="">
          <Link href="/staff/login">
            <button className="flex items-center gap-4 py-2 px-2 w-full text-[#FF1100] hover:bg-[#D3CAFF] font-inter font-medium cursor-pointer rounded-lg transition-all duration-200">
              <Image src={logout} alt="log out" className="w-6 h-6" />
              Log Out
            </button>
          </Link>
        </div>
      </div>

      {/* 🔹 Overlay for mobile (click to close) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40  z-30 2xl:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
