import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { useTheme } from "@mui/material";
import { tokens } from "../../../theme"; 
Chart.register(ArcElement, Tooltip, Legend);

export default function TopCategoriesChart({ data }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const labels = data.map(d => d.category || "Unknown");
  const counts = data.map(d => d.count || Math.floor(Math.random()*30+1));
  const pieColors = [
    colors.greenAccent[500],
    colors.blueAccent[500],
    colors.redAccent[500],
    colors.greenAccent[300],
    colors.blueAccent[300],
  ];

  const chartData = {
    labels,
    datasets: [
      {
        data: counts,
        backgroundColor: pieColors,
        borderColor: theme.palette.mode === "dark"
          ? colors.primary[500]
          : colors.primary[100],
        borderWidth: 2,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: colors.grey[100],
        }
      },
      tooltip: {
        backgroundColor: theme.palette.mode === "dark"
          ? colors.primary[500]
          : colors.primary[100],
        titleColor: colors.grey[100],
        bodyColor: colors.grey[100],
      }
    }
  };

  return <Pie data={chartData} options={options} />;
}