import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
Chart.register(ArcElement, Tooltip, Legend);

export default function TopCategoriesChart({ data }) {
  const labels = data.map(d=>d.category || "Unknown");
  const counts = data.map(d=>d.count || Math.floor(Math.random()*30+1));
  const colors = ["#00e396", "#775dd0", "#26a0fc", "#fe7f74", "#feca57"];

  const chartData = {
    labels,
    datasets: [
      {
        data: counts,
        backgroundColor: colors,
        borderColor: "#23254a",
        borderWidth: 2
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { labels: { color: "#fff" } }
    }
  };

  return <Pie data={chartData} options={options} />;
}


