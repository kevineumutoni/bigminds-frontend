import React from "react";
import { Box, Typography, List, ListItem, ListItemText, Chip } from "@mui/material";

function getCustomerDisplay(tx) {

  if (tx.user) {
    return (
      tx.user.name ||
      tx.user.username ||
      tx.user.phone_number ||
      tx.user.email ||
      "Unknown"
    );
  }

  return (
    tx.customer_name ||
    tx.phone_number ||
    tx.user_id ||
    tx.customer ||
    "Unknown"
  );
}

export default function RecentTransactions({ transactions }) {
  return (
    <List>
      {transactions.map((tx, i) => (
        <ListItem key={tx.transaction_id || i} divider>
          <ListItemText
            primary={
              <Typography variant="subtitle2">
                {getCustomerDisplay(tx)}
              </Typography>
            }
            secondary={
              <Typography variant="caption">
                {new Date(tx.transaction_date).toLocaleDateString()} &nbsp;|&nbsp; {tx.transaction_id}
              </Typography>
            }
          />
          <Chip label={`Ksh ${tx.amount}`} color="success" />
        </ListItem>
      ))}
      {(!transactions || transactions.length === 0) && (
        <Box textAlign="center" py={2}>
          <Typography>No transactions found.</Typography>
        </Box>
      )}
    </List>
  );
}