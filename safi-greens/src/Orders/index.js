import React, { useState } from "react";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import { useFetchOrders } from "./hooks/useFetchOrders.js";
import "./style.css"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, } from "@fortawesome/free-solid-svg-icons";
import OrderDetailsModal from "./OrderDetailsModal/index.js";

export const formatDateTime = (dateTimeString) => {
  const date = new Date(dateTimeString);
  const formattedDate = date.toISOString().slice(0, 10);
  return `${formattedDate}`;
};

export const totalPrice = (order) => {
  return Array.isArray(order.items)
    ? order.items.reduce((sum, item) => {
      const quantity = Number(item.quantity);
      const price = Number(item.price_at_order);
      return sum + quantity * price;
    }, 0)
    : 0;
};

export const formatText = (text) => {
  return text[0].toUpperCase() + text.slice(1,);
}

const Orders = () => {
  const { orders, loading, error } = useFetchOrders();
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage, setOrdersPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const filteredOrders = orders.filter((order) => {
    const buyer = order.buyer_name?.toLowerCase() || "";
    const vendor = order.vendor_name?.toLowerCase() || "";
    const status = order.status?.toLowerCase() || "";
    const query = searchQuery.toLowerCase();

    const matchSearch =
      buyer.includes(query) || vendor.includes(query) || status.includes(query);
    const matchesStatus = statusFilter === "All" || order.status === statusFilter;

    return matchSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const startIndex = (currentPage - 1) * ordersPerPage;
  const currentOrders = filteredOrders.slice(
    startIndex,
    startIndex + ordersPerPage
  );

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handleLimitChange = (e) => {
    setOrdersPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
    setCurrentPage(1);
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setShowModal(false);
  };

  const theme = useTheme();

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ThemeProvider theme={theme}>
      <div data-theme={theme.palette.mode} className="orders-container">
        <h2>Orders</h2>
        <div className="orders-controls">
          <input
            type="text"
            placeholder="Search by customer, vendor or status"
            value={searchQuery}
            onChange={handleSearch}
            className="search-input"
          />
          <label htmlFor="status-filter"></label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="status-filter"
          >
            <option value="All" className="status-option">
              All
            </option>
            <option value="Pending" className="status-option">
              Pending
            </option>
            <option value="Completed" className="status-option">
              Completed
            </option>
          </select>
        </div>
        <table className="orders-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Vendor</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th>Details</th>
            </tr>
          </thead>
          {filteredOrders.length === 0 ? (
            <tbody className="table-body">
              <tr className="order-row">
                <td colSpan={10}>
                  No orders found
                </td>
              </tr>
            </tbody>)
            : (<tbody className="table-body" style={{
              backgroundColor: theme.palette.mode === "dark" ? "#1f2a40" : "#ffffff",
            }
            }>
              {currentOrders.map((order) => (
                <tr key={order.id} className="order-row">
                  <td>{order.buyer_name}</td>
                  <td>{order.vendor_name}</td>
                  <td>Ksh {totalPrice(order)}</td>
                  <td className="status-data">
                    <div
                      style={{
                        backgroundColor:
                          order.status.toLowerCase() === "completed"
                            ? "#4caf50"
                            : "#2196f3",
                      }}
                      className="status"
                    >
                      {formatText(order.status)}
                    </div>
                  </td>
                  <td>{formatDateTime(order.order_date)}</td>
                  <td onClick={
                  () => handleOrderClick(order)
                } style={{cursor:'pointer'}} > <p className="view">View</p></td>
                </tr>
              ))}
            </tbody>)}
        </table>
        <div className="pagination" style={{
          backgroundColor: theme.palette.mode === "dark" ? "#3e4396" : "#a4a9fc", padding: "2px"
        }
        }>
          <div className="order-per-page" >
            <label htmlFor="orders-per-page">
              Orders per page:
              <select
                id="orders-per-page"
                value={ordersPerPage}
                onChange={handleLimitChange}
                stye={{
                  color: theme.palette.mode === "dark" ? "#fff" : "#000"
                }}
              >
                <option value={5} className="status-option" stye={{
                  color: theme.palette.mode === "dark" ? "#fff" : "#000"
                }}>
                  5
                </option>
                <option value={10} className="status-option" stye={{
                  color: theme.palette.mode === "dark" ? "#fff" : "#000"
                }}>
                  10
                </option>
                <option value={20} className="status-option" stye={{
                  color: theme.palette.mode === "dark" ? "#fff" : "#000"
                }}>
                  20
                </option>
              </select>
            </label>
          </div>
          <div className="btn-div">
            <p className="page-indicator">
              {currentPage} of {totalPages}
            </p>
            <div style={{alignContent:"center"}}>
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="nav-btn"
                stye={{
                  color: theme.palette.mode === "dark" ? "#fff" : "#000"
                }}
              >
                <FontAwesomeIcon icon={faChevronLeft} style={{width:'50%'}}/>
              </button>
            </div>
            <div style={{alignContent:"center"}}>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="nav-btn"
                stye={{
                  color: theme.palette.mode === "dark" ? "#fff" : "#000"
                }}
              >
                <FontAwesomeIcon icon={faChevronRight} style={{width:'50%'}} />
              </button>
            </div>
          </div>
        </div>
        <OrderDetailsModal
          isOpen={showModal}
          onClose={closeModal}
          selectedOrder={selectedOrder}
          totalPrice={totalPrice}
        />
  </div>
    </ThemeProvider>
  );
};

export default Orders;