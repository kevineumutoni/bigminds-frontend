const API_BASE_URL = process.env.REACT_APP_BASE_URL;
const API_TOKEN = process.env.REACT_APP_API_TOKEN; 

const authHeaders = {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${API_TOKEN}`
  
};

export const fetchUsers = async () =>
  (await fetch(`${API_BASE_URL}/users/`, { headers: authHeaders })).json();

export const fetchOrders = async () =>
  (await fetch(`${API_BASE_URL}/orders/`, { headers: authHeaders })).json();

export const fetchPayments = async () =>
  (await fetch(`${API_BASE_URL}/payments/`, { headers: authHeaders })).json();

export const fetchVendorProducts = async () =>
  (await fetch(`${API_BASE_URL}/vendor-products/`, { headers: authHeaders })).json();