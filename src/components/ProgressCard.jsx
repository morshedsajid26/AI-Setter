"use client";

export default function ProgressCard({
  title,
  value,
  percent,
  dropped, // negative number, e.g. -428
}) {
  const isNegative = dropped < 0;

  return (
    <div className="font-inter w-full">
      {/* Title Row */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-3">
          <p className="text-[#0F172B]">{title}</p>
          <span className="bg-[#F1F5F9] text-[12px] px-3 py-0.5 rounded-lg">
            {value}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Dropped Text */}
        {isNegative && (
          <p className="  text-sm text-[#E7000B]">
            {dropped} dropped
          </p>
        )}
        <p className="text-sm">{percent}%</p>
        </div>

      </div>

      {/* Progress Background */}
      <div className="w-full bg-[#E9EEF3] h-10 rounded-full overflow-hidden">

        {/* Filled Bar */}
        <div
          className="h-full flex items-center justify-start text-white text-sm font-medium pl-3 "
          style={{
            width: `${percent}%`,
            backgroundColor: "#900616", 
          }}
        >
          {percent}%
        </div>

      
      </div>
    </div>
  );
}
