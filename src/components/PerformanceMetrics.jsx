"use client";

export default function PerformanceMetrics({
  title,
  text,
  percent,
}) {
  return (
    <div className="font-inter w-full">
      {/* Title Row */}
      <div className="flex justify-between items-center mb-2">
        <p className="text-[#0F172B]">{title}</p>

        <p className="text-sm bg-[#DBEAFE] text-[#1447E6] px-3 py-1 rounded-full">
          {percent}%
        </p>
      </div>

      {/* Progress Background */}
      <div className="w-full bg-[#E9EEF3] h-3 rounded-full overflow-hidden">
        {/* Filled Bar */}
        <div
          className="h-full flex items-center rounded-full justify-start text-white text-sm font-medium pl-3 "
          style={{
            width: `${percent}%`,
            backgroundColor: "#900616",
          }}
        ></div>
      </div>
      <p className="mt-3 font-inter text-sm text-[#45556C]">{text}</p>
    </div>
  );
}
