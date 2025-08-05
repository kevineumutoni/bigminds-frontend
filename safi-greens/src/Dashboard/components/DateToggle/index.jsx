import React from "react";
import { ButtonGroup, Button } from "@mui/material";

export default function DateToggle({ period, setPeriod }) {
  return (
    <ButtonGroup variant="contained" size="small">
      <Button
        color={period === "weekly" ? "primary" : "inherit"}
        onClick={() => setPeriod("weekly")}
      >
        Weekly
      </Button>
      <Button
        color={period === "monthly" ? "primary" : "inherit"}
        onClick={() => setPeriod("monthly")}
      >
        Monthly
      </Button>
    </ButtonGroup>
  );
}


