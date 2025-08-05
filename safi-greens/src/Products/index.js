import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  TablePagination,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../theme';
import { useVendorProducts } from '../hooks/useVendorProducts';
import './style.css';

const ProductsTable = () => {
  const { vendorProducts, loading, error } = useVendorProducts();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('');

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isLightMode = theme.palette.mode === 'light';

  const getSafeImage = (url) => {
    if (!url || url.length < 10 || url.includes('pinterest.com') || !url.startsWith('http')) {
      return '/assets/placeholder.png';
    }
    return url;
  };

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredProducts = vendorProducts.filter((item) => {
    const searchValue = search.toLowerCase();
    const productName = item.product?.name?.toLowerCase() || '';
    const productCategory = item.product?.category?.toLowerCase() || '';

    if (filterType && productCategory !== filterType.toLowerCase()) return false;
    if (!searchValue) return true;

    return productName.includes(searchValue) || productCategory.includes(searchValue);
  });

  return (
    <Box
      m="20px"
      sx={{
  
        backgroundColor: isLightMode ? '#fff' : 'inherit',
        color: isLightMode ? '#001F54' : 'inherit',
      }}
    >

      <Box mb={2}>
        <Typography
          variant="subtitle1"
          color={isLightMode ? '#001F54' : 'textSecondary'}
          sx={{ fontSize: '2rem', mt: 5 }}
        >
          List of Products
        </Typography>
      </Box>

      {loading ? (
        <Box className="loading-container" sx={{ color: isLightMode ? '#001F54' : '#ccc' }}>
          <CircularProgress />
          <Typography className="loading-text" variant="body1">
            Loading products...
          </Typography>
        </Box>
      ) : error ? (
        <Typography className="error-text" variant="h6" color="error">
          Error: {error}
        </Typography>
      ) : (
        <>
          <Box mb={2} display="flex" gap={2} flexWrap="wrap">
            <TextField
              label="Search by fruit or vegetable"
              variant="outlined"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{
                width: 250,
                input: { color: isLightMode ? '#001F54' : '' },
                '& label': { color: isLightMode ? '#001F54' : '' },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: isLightMode ? '#001F54' : 'grey',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: isLightMode ? '#001F54' : 'grey',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: isLightMode ? '#001F54' : 'grey',
                },
                backgroundColor: isLightMode ? '#fff' : 'transparent',
                borderRadius: 1,
              }}
            />
            <TextField
              select
              label="Filter by fruit or vegetable"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              variant="outlined"
              sx={{
                width: 250,
                input: { color: isLightMode ? '#001F54' : '' },
                '& label': { color: isLightMode ? '#001F54' : '' },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: isLightMode ? '#001F54' : 'grey',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: isLightMode ? '#001F54' : 'grey',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: isLightMode ? '#001F54' : 'grey',
                },
                backgroundColor: isLightMode ? '#fff' : 'transparent',
                borderRadius: 1,
              }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Vegetable">Vegetable</MenuItem>
              <MenuItem value="Fruit">Fruit</MenuItem>
            </TextField>
          </Box>

          <TableContainer
            component={Paper}
            className="table-container"
            sx={{
              backgroundColor: isLightMode ? '#fff' : '#19213D',
              color: isLightMode ? '#001F54' : 'white',
          
            }}
          >
            <Table
              className="product-table"
              stickyHeader
              sx={{
                backgroundColor: isLightMode ? '#fff' : '#19213D',
                color: isLightMode ? '#001F54' : 'white',
              }}
            >
              <TableHead>
                <TableRow>
                  {['Product', 'Category', 'Unit', 'Price (KES)', 'Vendor'].map((title) => (
                    <TableCell
                      key={title}
                      sx={{
                        backgroundColor: '#48038C',
                        color: 'white',
                        borderBottom: '3px solid #13142D',
                        fontSize: '14px',
                        textAlign: 'left',
                        padding: '1rem',
                        position: 'sticky',
                        top: 0,
                        zIndex: 2,
                      }}
                    >
                      {title}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody className="table-body">
                {filteredProducts.length > 0 ? (
                  filteredProducts
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item) => (
                      <TableRow
                        key={item.product_details_id}
                        sx={{
                          '&:hover': {
                            backgroundColor: isLightMode ? '#d6e4ff' : '#2f3263',
                            cursor: 'pointer',
                          },
                        }}
                      >
                        <TableCell sx={{ color: isLightMode ? '#001F54' : '#ddd' }}>
                          <img
                            src={getSafeImage(item.product?.product_image)}
                            alt={item.product?.name}
                            className="product-image"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = '/assets/placeholder.png';
                            }}
                          />
                          <span className="product-name" style={{ color: isLightMode ? '#001F54' : 'white' }}>
                            {item.product?.name}
                          </span>
                        </TableCell>
                        <TableCell sx={{ color: isLightMode ? '#001F54' : '#ddd' }}>
                          {item.product?.category}
                        </TableCell>
                        <TableCell sx={{ color: isLightMode ? '#001F54' : '#ddd' }}>
                          {item.product?.unit}
                        </TableCell>
                        <TableCell sx={{ color: isLightMode ? '#001F54' : '#ddd' }}>
                          {item.price ? `KES ${item.price}` : 'N/A'}
                        </TableCell>
                        <TableCell sx={{ color: isLightMode ? '#001F54' : '#ddd' }}>
                          {item.vendor?.name}
                        </TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} sx={{ textAlign: 'center', padding: '20px', color: isLightMode ? '#001F54' : '#ddd' }}>
                      No products found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={filteredProducts.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 20, 50]}
              sx={{
                backgroundColor: isLightMode ? '#fff' : colors.blueAccent?.[700] || '#1976d2',
                color: isLightMode ? '#001F54' : colors.grey?.[100] || '#fff',
                '& .MuiTablePagination-selectIcon, & .MuiSvgIcon-root, & .MuiSelect-icon': {
                  color: isLightMode ? '#001F54' : colors.grey?.[100] || '#fff',
                },
                '& .MuiInputBase-root': {
                  color: isLightMode ? '#001F54' : colors.grey?.[100] || '#fff',
                },
                '& .MuiTablePagination-actions button': {
                  color: isLightMode ? '#001F54' : colors.grey?.[100] || '#fff',
                },
              }}
            />
          </TableContainer>
        </>
      )}
    </Box>
  );
};

export default ProductsTable;
