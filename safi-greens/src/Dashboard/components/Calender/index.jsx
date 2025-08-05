import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { Bar } from "react-chartjs-2";
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Title } from "chart.js";


Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title);


export default function ProductAnalytics({ data }) {
  const safeData = Array.isArray(data) ? data : [];


  if (safeData.length === 0) {
    return (
      <Card sx={{ background: "#1e2235", color: "#fff" }}>
        <CardContent>
          <Typography variant="h6" mb={2}>
            Highest Profit Products
          </Typography>
          <Typography>No product data available.</Typography>
        </CardContent>
      </Card>
    );
  }


  const chartData = {
    labels: safeData.map((item) => item.label),
    datasets: [
      {
        label: "Profit",
        data: safeData.map((item) => item.profit),
        backgroundColor: "#00e396",
      },
      {
        label: "Quantity",
        data: safeData.map((item) => item.quantity),
        backgroundColor: "#775dd0",
      },
    ],
  };


  return (
    <Card sx={{ background: "#1e2235", color: "#fff" }}>
      <CardContent>
        <Typography variant="h6" mb={2}>
          Highest Profit Products
        </Typography>
        <Bar data={chartData} />
      </CardContent>
    </Card>
  );
}



