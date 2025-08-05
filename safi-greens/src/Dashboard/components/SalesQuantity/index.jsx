import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";
Chart.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

export default function SalesQuantityChart({ data }) {
  const labels = data.map(d=>d.label || d.date || "Unknown");
  const quantities = data.map(d=>d.quantity || Math.floor(Math.random()*100+1));

  const chartData = {
    labels,
    datasets: [
      {
        label: "Quantity",
        data: quantities,
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

  return <Bar data={chartData} options={options} />;
}


