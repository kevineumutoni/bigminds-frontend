import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Button
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import { useFetchUsersData } from "../hooks/useFetchUsersData";
import { columns as baseColumns } from "./columns";

const getUniqueTypes = (users) => {
  const types = users.map((user) => user.user_type).filter(Boolean);
  return Array.from(new Set(types));
};

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { users, loading, error } = useFetchUsersData();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5); 

  const filteredUsers = users.filter((user) => {
    if (typeFilter && user.user_type !== typeFilter) return false;
    const searchValue = search.toLowerCase();
    return (
      (user.name?.toLowerCase().includes(searchValue)) ||
      (user.location?.toLowerCase().includes(searchValue)) ||
      (user.till_number?.toString().toLowerCase().includes(searchValue)) ||
      (user.phone_number?.toLowerCase().includes(searchValue))
    );
  });

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePageSizeChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const columns = baseColumns.map((col) =>
    col.field === "user_type"
      ? { ...col, filterable: true }
      : col
  );

  const uniqueTypes = getUniqueTypes(users);

  return (
    <Box m="20px">
      <Box mb={2}>
        <Typography variant="h4" color="primary" fontWeight="bold" gutterBottom>
          CONTACTS
        </Typography>
        <Typography
          variant="subtitle1"
          color="textSecondary"
          sx={{ fontSize: "2rem" }}
        >
          List of Contacts
        </Typography>
      </Box>

      <Box mb={2} display="flex" gap={2} flexWrap="wrap">
        <TextField
          label="Search by name, address, till number, or phone number"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: 350 }}
        />
        <FormControl variant="outlined" sx={{ width: 200 }}>
          <InputLabel id="type-filter-label">Filter by user type</InputLabel>
          <Select
            labelId="type-filter-label"
            label="Type"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {uniqueTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {error ? (
        <Box mt={4} textAlign="center">
          <Typography variant="h5" color="error">
            Sorry, page not found or could not load users.
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {error}
          </Typography>
        </Box>
      ) : (
        <>
          {loading && (
            <Box mt={2} mb={2} display="flex" justifyContent="center" alignItems="center">
              <Typography data-testid="loading-indicator" color="primary">Loading...</Typography>
            </Box>
          )}
          <Box
            sx={{
              "& .MuiDataGrid-root": { border: "none" },
              "& .MuiDataGrid-cell": { borderBottom: "none" },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colors.blueAccent?.[700] || "#1976d2",
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary?.[400] || "#fff",
              },
              "& .MuiCheckbox-root": {
                color: `${colors.greenAccent?.[200] || "#4caf50"} !important`,
              },
              "& .MuiDataGrid-toolbarContainer": {
                color: `${colors.grey?.[100] || "#fff"} !important`,
                borderBottom: "none",
              },
            }}
          >
            <DataGrid
              rows={paginatedUsers}
              columns={columns}
              slots={{ toolbar: GridToolbar }}
              loading={loading}
              getRowId={(row) => row.id}
              autoHeight 
              disableColumnMenu={false}
              hideFooter 
            />
          </Box>
          {/*  */}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mt={2}
            sx={{
              backgroundColor: theme.palette.mode === "dark" ? "#3e4396" : "#a4a9fc",
              padding: "8px",
              borderRadius: "8px"
            }}
          >
            <Typography>
              Page {totalPages === 0 ? 0 : currentPage} of {totalPages}
            </Typography>
            <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Rows per page</InputLabel>
              <Select
                value={rowsPerPage}
                onChange={handlePageSizeChange}
                label="Rows per page"
              >
                {[5, 9, 15, 50].map((size) => (
                  <MenuItem key={size} value={size}>{size}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box>
              <Button
                onClick={handlePrev}
                disabled={currentPage === 1 || totalPages === 0}
                variant="contained"
                sx={{ mr: 1 }}
              >
                Prev
              </Button>
              <Button
                onClick={handleNext}
                disabled={currentPage === totalPages || totalPages === 0}
                variant="contained"
              >
                Next
              </Button>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Contacts;