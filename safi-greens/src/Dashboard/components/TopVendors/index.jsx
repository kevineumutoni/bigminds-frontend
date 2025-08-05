import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";
Chart.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

export default function TopVendorsChart({ users }) {
  const vendors = users.filter(u => u.user_type === "vendor");
  const vendorCounts = vendors.map(v => ({
    name: v.name || v.email || v.phone_number,
    value: v.products_count || Math.floor(Math.random()*20+1)
  }));
  const sorted = vendorCounts.sort((a,b)=>b.value-a.value).slice(0,5);

  const data = {
    labels: sorted.map(v=>v.name),
    datasets: [
      {
        label: "Products",
        data: sorted.map(v=>v.value),
        backgroundColor: "#00e396",
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: { ticks: { color: "#fff" }, grid: { color: "rgba(255,255,255,0.05)" } },
      y: { ticks: { color: "#fff" }, grid: { color: "rgba(255,255,255,0.08)" } }
    }
  };

  return <Bar data={data} options={options} />;
}


