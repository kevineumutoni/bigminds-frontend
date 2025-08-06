import React from "react";
import { Box, Typography, List, ListItem, ListItemText, Chip } from "@mui/material";
import { useTheme } from "@mui/material";
import { tokens } from ".././../../theme";

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
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <List>
      {transactions.map((tx, i) => (
        <ListItem
          key={tx.transaction_id || i}
          divider
          sx={{
            bgcolor: theme.palette.mode === 'dark' ? colors.primary[700] : colors.primary[100],
          }}
        >
          <ListItemText
            primary={
              <Typography variant="subtitle2" color={colors.greenAccent[400]}>
                {getCustomerDisplay(tx)}
              </Typography>
            }
            secondary={
              <Typography variant="caption" color={colors.grey[300]}>
                {new Date(tx.transaction_date).toLocaleDateString()} &nbsp;|&nbsp; {tx.transaction_id}
              </Typography>
            }
          />
          <Chip
            label={`Ksh ${tx.amount}`}
            sx={{
              bgcolor: theme.palette.mode === 'dark'
                ? colors.greenAccent[600]
                : colors.greenAccent[400],
              color: colors.grey[100],
              fontWeight: 700,
            }}
          />
        </ListItem>
      ))}
      {(!transactions || transactions.length === 0) && (
        <Box textAlign="center" py={2}>
          <Typography color={colors.grey[300]}>No transactions found.</Typography>
        </Box>
      )}
    </List>
  );
}