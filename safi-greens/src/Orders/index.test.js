import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Orders, { formatDateTime, totalPrice } from './index';
import { useFetchOrders } from './hooks/useFetchOrders';

jest.mock('./hooks/useFetchOrders');

const mockOrders = [
  {
    id: 1,
    buyer_name: 'John Doe',
    vendor_name: 'Vendor A',
    status: 'Pending',
    order_date: '2025-07-20T10:00:00Z',
    items: [
      { product: { name: 'Apple', unit: 'kg' }, quantity: 2, price_at_order: 100 },
      { product: { name: 'Banana', unit: 'kg' }, quantity: 3, price_at_order: 50 }
    ]
  },
  {
    id: 2,
    buyer_name: 'Jane Smith',
    vendor_name: 'Vendor B',
    status: 'Completed',
    order_date: '2025-07-19T12:00:00Z',
    items: [
      { product: { name: 'Orange', unit: 'kg' }, quantity: 1, price_at_order: 200 }
    ]
  }
];

describe('Orders Component', () => {
  beforeEach(() => {
    useFetchOrders.mockReturnValue({
      orders: mockOrders,
      loading: false,
      error: null
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state', () => {
    useFetchOrders.mockReturnValue({
      orders: [],
      loading: true,
      error: null
    });

    render(<Orders />);
    expect(screen.getByText('Loading orders...')).toBeInTheDocument();
  });

  test('renders error state', () => {
    useFetchOrders.mockReturnValue({
      orders: [],
      loading: false,
      error: 'Failed to fetch orders'
    });

    render(<Orders />);
    expect(screen.getByText('Error: Failed to fetch orders')).toBeInTheDocument();
  });

  test('renders orders table with data', () => {
    render(<Orders />);
    
    expect(screen.getByText('Orders')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Vendor A')).toBeInTheDocument();
    expect(screen.getByText('Pending', { selector: '.status' })).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Vendor B')).toBeInTheDocument();
    expect(screen.getByText('Completed', { selector: '.status' })).toBeInTheDocument();
  });

  test('filters orders by search query', async () => {
    render(<Orders />);
    
    const searchInput = screen.getByPlaceholderText('Search by customer, vendor or status');
    fireEvent.change(searchInput, { target: { value: 'John' } });
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
    });
  });

 

  test('changes orders per page', async () => {
    render(<Orders />);
    
    const perPageSelect = screen.getByRole('combobox', { name: /orders per page/i });
    fireEvent.change(perPageSelect, { target: { value: '10' } });
    
    await waitFor(() => {
      expect(perPageSelect).toHaveValue('10');
    });
  });

  test('formatDateTime formats date correctly', () => {
    const dateString = '2025-07-20T10:30:00Z';
    const formatted = formatDateTime(dateString);
    expect(formatted).toBe('2025-07-20');
  });

  test('totalPrice calculates correctly', () => {
    const order = mockOrders[0];
    const total = totalPrice(order);
    expect(total).toBe(350);
  });

  test('totalPrice handles empty items array', () => {
    const order = { items: [] };
    const total = totalPrice(order);
    expect(total).toBe(0);
  });

  test('totalPrice handles non-array items', () => {
    const order = { items: null };
    const total = totalPrice(order);
    expect(total).toBe(0);
  });

  test('displays no orders found when filteredOrders is empty', () => {
    render(<Orders />);
    
    const searchInput = screen.getByPlaceholderText('Search by customer, vendor or status');
    fireEvent.change(searchInput, { target: { value: 'Nonexistent' } });
    
    expect(screen.getByText('No orders found')).toBeInTheDocument();
  });
});