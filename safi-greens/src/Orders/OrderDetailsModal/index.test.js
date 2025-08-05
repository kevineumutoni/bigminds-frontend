import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import OrderDetailsModal from './index.js';
import { formatText } from '../index.js';

jest.mock('../index.js', () => ({
  formatText: jest.fn((text) => text.charAt(0).toUpperCase() + text.slice(1)),
}));

jest.mock('../../shared-components/Modal', () => ({ isOpen, onClose, children }) => (
  isOpen ? <div data-testid="modal">{children}</div> : null
));

const mockOrder = {
  buyer_name: 'John Doe',
  vendor_name: 'Jane Vendor',
  status: 'completed',
  items: [
    { product: { name: 'Apple', unit: 'kg' }, quantity: 2, price_at_order: 100 },
    { product: { name: 'Banana', unit: 'bunch' }, quantity: 1, price_at_order: 50 },
  ],
};

const mockTotalPrice = jest.fn((order) => 250);

describe('OrderDetailsModal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    selectedOrder: mockOrder,
    totalPrice: mockTotalPrice,
  };

  const theme = createTheme({
    palette: {
      mode: 'light',
    },
  });

  const renderWithTheme = (component) => {
    return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
  };

  test('renders nothing when selectedOrder is null', () => {
    const { container } = renderWithTheme(
      <OrderDetailsModal {...defaultProps} selectedOrder={null} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  test('renders modal when isOpen is true and selectedOrder is provided', () => {
    renderWithTheme(<OrderDetailsModal {...defaultProps} />);
    expect(screen.getByTestId('modal')).toBeInTheDocument();
  });

  test('renders correct number of items in the table', () => {
    renderWithTheme(<OrderDetailsModal {...defaultProps} />);
    
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(3);
    
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('kg')).toBeInTheDocument();
    expect(screen.getByText('Ksh 100')).toBeInTheDocument();
    
    expect(screen.getByText('Banana')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('bunch')).toBeInTheDocument();
    expect(screen.getByText('Ksh 50')).toBeInTheDocument();
  });

  test('applies correct theme-based styles to table body', () => {
    renderWithTheme(<OrderDetailsModal {...defaultProps} />);
    const tbody = screen.getByRole('table').querySelector('tbody');
    expect(tbody).toHaveStyle({
      backgroundColor: '#ffffff',
      color: '#000',
    });
  });

  test('applies dark theme styles when theme mode is dark', () => {
    const darkTheme = createTheme({
      palette: {
        mode: 'dark',
      },
    });
    
    render(
      <ThemeProvider theme={darkTheme}>
        <OrderDetailsModal {...defaultProps} />
      </ThemeProvider>
    );
    
    const tbody = screen.getByRole('table').querySelector('tbody');
    expect(tbody).toHaveStyle({
      backgroundColor: '#1f2a40',
      color: '#fff',
    });
  });

  test('calls totalPrice function with selectedOrder', () => {
    renderWithTheme(<OrderDetailsModal {...defaultProps} />);
    expect(mockTotalPrice).toHaveBeenCalledWith(mockOrder);
  });
});