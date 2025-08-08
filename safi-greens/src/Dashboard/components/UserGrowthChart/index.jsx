import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useTheme } from "@mui/material";
import { tokens } from "../../../theme"; 

Chart.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

export default function UserGrowthChart({ users }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  
  const counts = {};
  users.forEach(u => {
    if (!u.created_at) return;
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
        borderColor: colors.greenAccent[400],
        backgroundColor: colors.greenAccent[400],
        tension: 0.4,
        pointRadius: 4,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false },
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
        }
      },
      y: {
        ticks: {
          color: colors.grey[100],
          stepSize: 1,
          callback: value => Number.isInteger(value) ? value : null
        },
        grid: {
          color: theme.palette.mode === "dark"
            ? "rgba(255,255,255,0.08)"
            : "rgba(0,0,0,0.09)",
        }
      }
    }
  };

  return <Line data={data} options={options} />;
}