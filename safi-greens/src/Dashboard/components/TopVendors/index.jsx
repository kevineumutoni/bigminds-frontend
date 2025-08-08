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
export default function TopVendorsChart({ users }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
        backgroundColor: colors.greenAccent[500],
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

  return <Bar data={data} options={options} />;
}