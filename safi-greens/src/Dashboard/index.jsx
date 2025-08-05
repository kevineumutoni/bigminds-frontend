import React, { useState } from "react";
import { Box, Grid, Paper, Typography, CircularProgress } from "@mui/material";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import useDashboardData from "../hooks/useDashboardData";
import { useFetchUsersData } from "../hooks/useFetchUsersData";
import SalesQuantityChart from "./components/SalesQuantity";
import TopCategoriesChart from "./components/TopCategoriesCharts";
import UserGrowthChart from "./components/UserGrowthChart";
import TopVendorsChart from "./components/TopVendors";
import StatsCards from "./components/StatsCards";
import SalesGraph from "./components/SalesGraph";
import RecentTransactions from "./components/RecentTransations";
import DateToggle from "./components/DateToggle";

export default function Dashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [period, setPeriod] = useState("monthly");
  const {
    stats,
    salesHistory,
    transactions,
    categoriesData,
    loading,
  } = useDashboardData(period);
  const { users, loading: usersLoading } = useFetchUsersData();

  if (loading || usersLoading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        sx={{
          bgcolor: theme.palette.mode === 'dark' ? '#19213D' : '#ffffff',
        }}
      >
        <CircularProgress color="success" />
      </Box>
    );

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Box sx={{ maxWidth: "1600px", margin: "0 auto", px: 5 }}>
        {/* dashboard title and Toggle */}
        <Box
          sx={{
            pt: 4,
            pb: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "90%",
            margin: 'auto'
          }}
        >
          <Box>
            <Typography variant="h3" color="secondary" fontWeight="bold">
              DASHBOARD
            </Typography>
            <Typography variant="subtitle1" color="common.white">
              Welcome to your dashboard
            </Typography>
          </Box>
          <DateToggle period={period} setPeriod={setPeriod} />
        </Box>

        <Box sx={{ pt: 3, pb: 3, width: '90%', margin: 'auto' }}>
          <StatsCards stats={stats} />
          <Box sx={{ height: 20 }} />
        </Box>

        {/* Revenue , Sales Quantity , Recent Transactions */}
        <Grid container spacing={6} justifyContent="center" alignItems="stretch" sx={{ pb: 4 }}>
          <Grid  xs={12} md={5}>
            <Paper
              sx={{
                height: 400,
                width: 400,
                p: 4,
                bgcolor: theme.palette.mode === 'dark' ? '#1f2a40' : '#ffffff',
                color: colors.grey[100],
                borderRadius: 3,
                boxShadow: 6,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                mb: 2, 
              }}
            >
              <Typography variant="h4" color={colors.greenAccent[300]} mb={2}>
                Revenue Trend
              </Typography>
              <SalesGraph
                salesHistory={Array.isArray(salesHistory) ? salesHistory : []}
                period={period}
              />
            </Paper>
          </Grid>
          <Grid  xs={12} md={4}>
            <Paper
              sx={{
                height: 400,
                width: 400,
                p: 4,
                bgcolor: theme.palette.mode === 'dark' ? '#1f2a40' : '#ffffff',
                color: colors.grey[100],
                borderRadius: 3,
                boxShadow: 6,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                mb: 2, 
              }}
            >
              <Typography variant="h4" color={colors.blueAccent[300]} mb={2}>
                Sales Quantity
              </Typography>
              <SalesQuantityChart data={Array.isArray(salesHistory) ? salesHistory : []} />
            </Paper>
          </Grid>
          <Grid  xs={12} md={3}>
            <Paper
              sx={{
                height: 400,
                width: 400,
                p: 4,
                bgcolor: theme.palette.mode === 'dark' ? '#1f2a40' : '#ffffff',
                color: colors.grey[100],
                borderRadius: 3,
                boxShadow: 6,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                overflow: "hidden",
                mb: 2, 
              }}
            >
              <Typography variant="h4" color={colors.greenAccent[300]} mb={2}>
                Recent Transactions
              </Typography>
              <Box sx={{ flex: 1, overflowY: "auto", maxHeight: 340, pr: 1 }}>
                <RecentTransactions transactions={Array.isArray(transactions) ? transactions : []} />
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* User Growth, Top Vendors, Top Categories */}
        <Grid container spacing={6} justifyContent="center" alignItems="stretch" sx={{ pb: 4 }}>
          <Grid  xs={12} md={5}>
            <Paper
              sx={{
                height: 350,
                width: 400,
                p: 4,
                bgcolor: theme.palette.mode === 'dark' ? '#1f2a40' : '#ffffff',
                color: colors.grey[100],
                borderRadius: 3,
                boxShadow: 6,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                mb: 2, 
              }}
            >
              <Typography variant="h4" color={colors.greenAccent[300]} mb={2}>
                User Growth
              </Typography>
              <UserGrowthChart users={users} />
            </Paper>
          </Grid>
          <Grid  xs={12} md={4}>
            <Paper
              sx={{
                height: 350,
                width: 400,
                p: 4,
                bgcolor: theme.palette.mode === 'dark' ? '#1f2a40' : '#ffffff',
                color: colors.grey[100],
                borderRadius: 3,
                boxShadow: 6,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                mb: 2, 
              }}
            >
              <Typography variant="h4" color={colors.blueAccent[300]} mb={2}>
                Top Vendors
              </Typography>
              <TopVendorsChart users={users} />
            </Paper>
          </Grid>
          <Grid  xs={12} md={4}>
            <Paper
              sx={{
                height: 350,
                width: 400,
                p: 4,
                bgcolor: theme.palette.mode === 'dark' ? '#1f2a40' : '#ffffff',
                color: colors.grey[100],
                borderRadius: 3,
                boxShadow: 6,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                mb: 2, 
              }}
            >
              <Typography variant="h4" color={colors.greenAccent[300]} mb={2}>
                Top Categories
              </Typography>
              <TopCategoriesChart data={categoriesData || []} />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}


