import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { Line } from "react-chartjs-2";
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from "chart.js";

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);

export default function SalesGraph({ salesHistory, period }) {
  const data = {
    labels: salesHistory.map((item) => item.label),
    datasets: [
      {
        label: "Revenue",
        data: salesHistory.map((item) => item.value),
        fill: false,
        borderColor: "#00e396",
        backgroundColor: "#00e396",
        tension: 0.1,
      },
    ],
  };

  return (
    <Card sx={{ background: "#1e2235", color: "#fff" }}>
      <CardContent>
        <Typography variant="h6" mb={2}>
          Revenue Generated ({period === "monthly" ? "Monthly" : "Weekly"})
        </Typography>
        <Line data={data} />
      </CardContent>
    </Card>
  );
}


