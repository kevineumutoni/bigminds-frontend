
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useTheme } from "@mui/material";
import { tokens } from '../../../theme';
import PersonIcon from '@mui/icons-material/Person';
export default function StatsCards({ stats }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const cards = [
    { label: "New Customers", value: stats.newCustomers, icon: <PersonIcon sx={{ fontSize: 30 , color: "white"}} />,color: colors.greenAccent[400] },
    { label: "Total Vendors", value: stats.totalVendors, color: colors.blueAccent[300] },
    { label: "Orders Placed", value: stats.totalOrdersPlaced, color: colors.greenAccent[200] },
    { label: "Products", value: stats.totalProducts, color: colors.blueAccent[600] },
    { label: "Monthly Sales", value: stats.monthlySales && `Ksh ${stats.monthlySales.toLocaleString()}`, color: colors.greenAccent[600] },
    { label: "Weekly Sales", value: stats.weeklySales && `Ksh ${stats.weeklySales.toLocaleString()}`, color: colors.blueAccent[200] },
  ];

  return (
    <Grid container spacing={3}>
      {cards.map((c, i) => (
        <Grid xs={12} sm={6} md={2} key={c.label}>
          <Paper
            sx={{
              padding: '35px',
              marginLeft:'40px',
              height: 100,
              bgcolor: colors.primary[700] || "#33366dff",
              color: colors.grey[100],
              borderRadius: 2,
              boxShadow: 3,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Typography
              variant="subtitle"
              color={c.color}
              sx={{ mb: 1.5 }} 
            >
              {c.label}
            </Typography>
            <Typography
              variant="h3"
              fontWeight={700}
              sx={{ mb: 1.5 }}
            >
              {c.value ?? 0}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}


