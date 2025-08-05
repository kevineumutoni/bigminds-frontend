import React, { useState } from 'react';
import useGetPayments from './hooks/getPayments';
import { Box, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import './style.css';


const Payment = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState('');
  const typeFilter = '';
  const { payments, loading, error, currentPage, setCurrentPage } = useGetPayments(
    searchTerm,
    itemsPerPage,
    0
  );

  const normalizedPayments = Array.isArray(payments)
    ? payments
    : payments?.data || payments?.payments || [];

  const formatStatus = (status) => {
    if (!status) return 'Unknown';
    if (status.toLowerCase() === 'success') return 'Successful';
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  };

  const changeLower = (val) => (val !== null && val !== undefined ? String(val).toLowerCase() : '');

  const filteredPayments = normalizedPayments.filter((payment) => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();
    const matchType = typeFilter ? payment.type === typeFilter : true;
    const matchStatus = statusFilter ? formatStatus(payment.status) === statusFilter : true;

    if (!normalizedSearchTerm) {
      return matchType && matchStatus;
    }

    const fieldsToSearch = [
      changeLower(payment.amount),
      changeLower(payment.phone_number),
      changeLower(payment.receiver_phone),
      changeLower(payment.mpesa_receipt_number),
      changeLower(payment.status),
    ];
    const matchesSearch = fieldsToSearch.some((field) => field.includes(normalizedSearchTerm));
    return matchesSearch && matchType && matchStatus;
  });

  const totalItems = filteredPayments.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentItems = filteredPayments.slice(startIndex, endIndex);
  if (safeCurrentPage !== currentPage) {
    setCurrentPage(safeCurrentPage);
  }

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="payment-container">
      <h1>List of Payments</h1>
      <Box mb={2} className="filters">
        <TextField
          label="Search by  Amount,phone_number"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <FormControl variant="outlined" className="status-filter">
          <InputLabel id="status-filter-label">Filter by status</InputLabel>
          <Select
            labelId="status-filter-label"
            label="Filter by status"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Successful">Successful</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Failed">Failed</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <div className="table-wrapper">
        <table className="payment_table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Amount</th>
              <th>Sender Number</th>
              <th>Receiver Number</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length === 0 ? (
              <tr>
                <td colSpan={10}>No rows found.</td>
              </tr>
            ) : (
              currentItems.map((payment, idx) => (
                <tr key={payment.payment_id || payment.id || idx}>
                  <td>{startIndex + idx + 1}</td>
                  <td>{payment.amount ?? 'N/A'}</td>
                  <td>{payment.phone_number ?? 'N/A'}</td>
                  <td>{payment.mpesa_receipt_number ?? 'N/A'}</td>
                  <td className={`status-${formatStatus(payment.status).toLowerCase()}`}>
                    {formatStatus(payment.status)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <span>Rows per page: </span>
        <select
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        <span>
          {`${totalItems === 0 ? 0 : startIndex + 1}-${endIndex} of ${totalItems}`}
        </span>
        <button
          onClick={handlePrevPage}
          disabled={safeCurrentPage === 1}
          aria-label="Previous page"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          onClick={handleNextPage}
          disabled={safeCurrentPage === totalPages}
          aria-label="Next page"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Payment;
