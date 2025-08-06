import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useTheme } from "@mui/material";
import { tokens } from "../../../theme"; 

Chart.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

export default function SalesQuantityChart({ data }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const labels = data.map((d) => d.label || d.date || "Unknown");
  const quantities = data.map((d) => d.quantity || Math.floor(Math.random() * 100 + 1));

  const chartData = {
    labels,
    datasets: [
      {
        label: "Quantity",
        data: quantities,
        backgroundColor: colors.greenAccent[500], 
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: theme.palette.mode === "dark"
          ? colors.primary[500]
          : colors.primary[100],
        titleColor: colors.grey[100],
        bodyColor: colors.grey[100],
      },
    },
    scales: {
      x: {
        ticks: { color: colors.grey[100] },
        grid: {
          color: theme.palette.mode === "dark"
            ? "rgba(255,255,255,0.05)"
            : "rgba(0,0,0,0.07)",
        },
      },
      y: {
        ticks: { color: colors.grey[100] },
        grid: {
          color: theme.palette.mode === "dark"
            ? "rgba(255,255,255,0.08)"
            : "rgba(0,0,0,0.09)",
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}