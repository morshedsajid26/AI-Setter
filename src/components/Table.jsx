import React from "react";

export default function Table({
  TableHeads,
  TableRows,
  headClass,
  tableClass,
}) {
  return (
    <table
      className={`w-full  border-collapse   overflow-hidden ${tableClass}`}
    >
      {/* ==== TABLE HEADER ==== */}
      <thead>
        <tr className="">
          {TableHeads.map((head, idx) => (
            <th
              key={idx}
              className={` font-inter text-left text-[18px] font-medium  text-[#0A0A0A]
                ${
                  idx === TableHeads.length - 1 ? "rounded-tr-2xl" : ""
                } ${headClass}`}
              style={{ width: head.width }}
            >
              {head.Title}
            </th>
          ))}
        </tr>
      </thead>

      {/* ==== TABLE BODY ==== */}
      <tbody className="">
        {TableRows.map((row, rowIdx) => (
          <tr key={rowIdx}>
            {TableHeads.map((head, headIdx) => (
              <td
                key={headIdx}
                className="border-b  border-[#000000]/10  py-[22px] font-inter text-sm text-[#0F172B] "
              >
                {/* If render function exists, use it — otherwise show plain data */}
                {head.render ? head.render(row, rowIdx) : row[head.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
