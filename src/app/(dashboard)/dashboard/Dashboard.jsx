import Bredcumb from "@/src/components/Bredcumb";
import React from "react";
import { FaPlus } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div>
      <div className=" flex items-center justify-between">
        <div>
          <Bredcumb />
          <p className="text-[#606060] font-inter">
            Welcome back! Here's what's happening today.
          </p>
        </div>
        <div>
          <button className="bg-linear-to-l from-[#9810FA] to-[#7F22FE] text-white px-4 py-2 rounded-lg font-inter font-medium flex items-center gap-2 cursor-pointer">
            <FaPlus />
            Connect Channel
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-5">
        <div className="bg-[#FFFFFF] rounded-lg col-span-3">1</div>
        <div className="bg-[#FFFFFF] rounded-lg col-span-3">1</div>
        <div className="bg-[#FFFFFF] rounded-lg col-span-3">1</div>
        <div className="bg-[#FFFFFF] rounded-lg col-span-3">1</div>

        <div className="bg-[#FFFFFF] rounded-lg col-span-6">1</div>
        <div className="bg-[#FFFFFF] rounded-lg col-span-6">1</div>

        <div className="bg-[#FFFFFF] rounded-lg col-span-8">1</div>
        <div className="col-span-4">
            
          <div className="bg-[#FFFFFF] rounded-lg ">1</div>
          <div className="bg-[#FFFFFF] rounded-lg ">1</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
