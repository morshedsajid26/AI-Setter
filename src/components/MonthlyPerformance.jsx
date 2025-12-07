"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";

const data = [
  { name: "Jul", booked: 120, qualified: 310, dms: 900 },
  { name: "Aug", booked: 150, qualified: 345, dms: 1050 },
  { name: "Sep", booked: 140, qualified: 330, dms: 980 },
  { name: "Oct", booked: 175, qualified: 380, dms: 1150 },
  { name: "Nov", booked: 190, qualified: 395, dms: 1300 },
];

export default function MonthlyPerformance() {
  return (
    <div
    className="font-inter"
    style={{ width: "100%", height: 350 }}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 10 }}>
          <CartesianGrid stroke="#E5E7EB"  strokeDasharray="3 3" />

          <XAxis dataKey="name" tick={{ fill: "#6B7280", fontSize: 14 }} />
          <YAxis
            domain={[0, 1400]}
            tick={{ fill: "#6B7280", fontSize: 14 }}
            ticks={[0, 350, 700, 1050, 1400]}
          />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="booked"
            stroke="#F5A300"
            strokeWidth={3}
            dot={{ r: 5, strokeWidth: 2 }}
          />
          <Line
            type="monotone"
            dataKey="dms"
            stroke="#7C3AED"
            strokeWidth={4}
            dot={{ r: 6, strokeWidth: 2 }}
          />
          <Line
            type="monotone"
            dataKey="qualified"
            stroke="#10B981"
            strokeWidth={3}
            dot={{ r: 5, strokeWidth: 2 }}
          />

          <Legend
            verticalAlign="bottom"
            height={40}
            formatter={(value) =>
              ({
                booked: "Booked",
                dms: "DMs",
                qualified: "Qualified",
              }[value])
            }
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
