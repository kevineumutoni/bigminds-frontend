import React from "react";
import { Chip } from "@mui/material";

export function formatType(type) {
  if (type === "customer") {
    return <Chip label="Customer" style={{ backgroundColor: "#4caf50", color: "#fff" }} />;
  }
  if (type === "vendor") {
    return <Chip label="Vendor" style={{ backgroundColor: "#1976d2", color: "#fff" }} />;
  }
  return <Chip label={type} />;
}