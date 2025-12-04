"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "W1", value: 8 },
  { name: "W2", value: 12 },
  { name: "W3", value: 15 },
  { name: "W4", value: 19 },
];

export default function WeeklyBookingBar() {
  return (
    <div
      className="w-full h-[300px]"
       
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

          <XAxis
            dataKey="name"
            tick={{ fill: "#64748B", fontSize: 14, fontFamily: "inter" }}
          />

          <YAxis
            tick={{ fill: "#64748B", fontSize: 14, fontFamily: "inter" }}
            domain={[0, 20]}
          />

          <Tooltip
            contentStyle={{ fontFamily: "Poppins" }}
            labelStyle={{ fontFamily: "Poppins" }}
            itemStyle={{ fontFamily: "Poppins" }}
          />

          <Bar
            dataKey="value"
            fill="#900616"
            radius={[6, 6, 0, 0]} // ROUNDED TOP
            barSize={95} // SAME WIDTH FEELING
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
