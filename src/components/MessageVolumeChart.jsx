"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";



export default function MessageVolumeChart({ data = [] }) {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="day" tick={{ fill: "#64748B" }} fontFamily="inter" />
          <YAxis
            tick={{ fill: "#64748B" }}
            domain={[0, "auto"]}
            fontFamily="inter"
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#900616"
            strokeWidth={3}
            dot={{ r: 5, fill: "#900616", strokeWidth: 2 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
