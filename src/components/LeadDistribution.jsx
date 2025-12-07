"use client";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Instagram", value: 45, color: "#EC156D" },
  { name: "Facebook", value: 28, color: "#1D78FF" },
  { name: "LinkedIn", value: 18, color: "#0A4CAC" },
  { name: "TikTok", value: 9, color: "#000000" },
];

export default function LeadDistribution() {
  return (
    <div className="flex items-center gap-20 font-inter">
      {/* Doughnut Chart */}
      <div style={{ width: 260, height: 260 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Labels */}
      <div className="space-y-4 text-gray-700 text-lg">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-3">
            <span
              style={{
                display: "inline-block",
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: item.color,
              }}
            />
            <span>{item.name}</span>
            <span className="ml-2">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
