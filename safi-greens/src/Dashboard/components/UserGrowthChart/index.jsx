import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";
Chart.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

export default function UserGrowthChart({ users }) {
  console.log("UserGrowthChart users:", users); // Debug line

  const counts = {};
  users.forEach(u => {
    if (!u.created_at) return; // Skip if no date
    const date = new Date(u.created_at);
    const key = `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}`;
    counts[key] = (counts[key] || 0) + 1;
  });
  const labels = Object.keys(counts).sort();
  const dataPoints = labels.map(l => counts[l]);

  const data = {
    labels,
    datasets: [
      {
        label: "New Users",
        data: dataPoints,
        fill: false,
        borderColor: "#00e396",
        backgroundColor: "#00e396",
        tension: 0.4,
        pointRadius: 4,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false }
    },
    scales: {
      x: { ticks: { color: "#fff" }, grid: { color: "rgba(255,255,255,0.05)" }},
      y: {
        ticks: {
          color: "#fff",
          stepSize: 1,
          callback: (value) => Number.isInteger(value) ? value : null
        },
        grid: { color: "rgba(255,255,255,0.08)" }
      }
    }
  };

  return <Line data={data} options={options} />;
}