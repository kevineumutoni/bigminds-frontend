import React from 'react';
import Modal from '../../shared-components/Modal/index.js';
import { useTheme } from '@mui/material/styles';
import './style.css';
import { formatText } from '../index.js';

const OrderDetailsModal = ({ isOpen, onClose, selectedOrder, totalPrice }) => {
  const theme = useTheme();

  if (!selectedOrder) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h3>Order Details</h3>
      <p><strong>Customer:</strong> {selectedOrder.buyer_name}</p>
      <p><strong>Vendor:</strong> {selectedOrder.vendor_name}</p>
      <p><strong>Status:</strong> <span style={{
                        backgroundColor:
                        selectedOrder.status.toLowerCase() === "completed"
                            ? "#4caf50"
                            : "#2196f3",
                      }} className='status'>{formatText(selectedOrder.status)}</span></p>
      <p><strong>Total Price:</strong> Ksh {totalPrice(selectedOrder)}</p>
      <div className='item-container'>
      <table className="items-table">
        <thead>          
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Unit</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody
          style={{
            backgroundColor: theme.palette.mode === 'dark' ? '#1f2a40' : '#ffffff',
            color: theme.palette.mode === 'dark' ? '#fff' : '#000',
          }}
        >
          {selectedOrder.items.map((item, i) => (
            <tr key={i}>
              <td>{item.product.name}</td>
              <td>{item.quantity}</td>
              <td>{item.product.unit}</td>
              <td>Ksh {item.price_at_order}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </Modal>
  );
};

export default OrderDetailsModal;