
import React from "react";
import { useState } from "react";   

function GraphHeader({ selectedYear, setSelectedYear }) {
const currentYear = new Date().getFullYear();

const years = [];

for (let year = currentYear + 2; year >= 1999; year--) {
  years.push(year);
}

  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h2 className="text-2xl font-bold text-white">Blog Overview</h2>

        <p className="text-slate-400 mt-2">Monthly analytics of your blogs</p>
      </div>
      <select
        value={selectedYear}
        onChange={(e) => setSelectedYear(Number(e.target.value))}
      >
        {years.map((year) => (
          <option className="bg-[#13284B] text-white" key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}

export default GraphHeader;
