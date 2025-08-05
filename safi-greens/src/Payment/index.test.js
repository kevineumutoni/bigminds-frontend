import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import Payment from './index';
import useGetPayments from './hooks/getPayments';

jest.mock('./hooks/getPayments');

describe('Payment Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockPayments = [
    {
      payment_id: '1',
      amount: '100',
      phone_number: '1234567890',
      receiver_phone: '0987654321',
      mpesa_receipt_number: 'ABC123',
      status: 'success',
    },
    {
      payment_id: '2',
      amount: '200',
      phone_number: '222333444',
      receiver_phone: '111222333',
      mpesa_receipt_number: 'XYZ789',
      status: 'pending',
    },
    {
      payment_id: '3',
      amount: '300',
      phone_number: '555666777',
      receiver_phone: '444555666',
      mpesa_receipt_number: 'LMN456',
      status: 'failed',
    },
  ];

  it('renders payment data correctly', () => {
    useGetPayments.mockReturnValue({
      payments: mockPayments,
      loading: false,
      error: null,
      currentPage: 1,
      setCurrentPage: jest.fn(),
    });

    render(<Payment />);

    const table = screen.getByRole('table');
    const { getAllByRole, getByText } = within(table);
    const rows = getAllByRole('row');
    expect(rows.length).toBe(4);
    expect(getByText('100')).toBeInTheDocument();
    expect(getByText('Successful')).toBeInTheDocument();
  });

  it('filters payments by searchTerm', () => {
    useGetPayments.mockReturnValue({
      payments: mockPayments,
      loading: false,
      error: null,
      currentPage: 1,
      setCurrentPage: jest.fn(),
    });

    render(<Payment />);

    const input = screen.getByLabelText(/Search by Amount,phone_number/i);
    fireEvent.change(input, { target: { value: '200' } });

    const table = screen.getByRole('table');
    const { queryByText, getByText } = within(table);

    expect(queryByText('100')).not.toBeInTheDocument();
    expect(getByText('200')).toBeInTheDocument();
  });

  it('filters payments by status', () => {
    const setCurrentPageMock = jest.fn();

    useGetPayments.mockReturnValue({
      payments: mockPayments,
      loading: false,
      error: null,
      currentPage: 1,
      setCurrentPage: setCurrentPageMock,
    });

    render(<Payment />);
    const statusSelect = screen.getByLabelText(/Filter by status/i);
    fireEvent.mouseDown(statusSelect); 

    const pendingOption = screen.getByRole('option', { name: 'Pending' });
    fireEvent.click(pendingOption);

    const table = screen.getByRole('table');
    const { queryByText, getByText } = within(table);
    expect(queryByText('20')).not.toBeInTheDocument();
    expect(getByText('200')).toBeInTheDocument();
    expect(setCurrentPageMock).toHaveBeenCalledWith(1);
  });

  it('filters payments by failed status', () => {
  const setCurrentPageMock = jest.fn();
  useGetPayments.mockReturnValue({
    payments: mockPayments,
    loading: false,
    error: null,
    currentPage: 1,
    setCurrentPage: setCurrentPageMock,
  });
  render(<Payment />);
  const statusSelect = screen.getByLabelText(/Filter by status/i);
  fireEvent.mouseDown(statusSelect);
  const failedOption = screen.getByRole('option', { name: 'Failed' });
  fireEvent.click(failedOption);
  const table = screen.getByRole('table');
  const { queryByText, getByText } = within(table);
  expect(queryByText('100')).not.toBeInTheDocument();  
  expect(queryByText('200')).not.toBeInTheDocument();   
  expect(getByText('300')).toBeInTheDocument();
  expect(setCurrentPageMock).toHaveBeenCalledWith(1);
});
it('displays an error message when an error occurs', () => {
    useGetPayments.mockReturnValue({
      payments: [],
      loading: false,
      error: 'Network Error',
      currentPage: 1,
      setCurrentPage: jest.fn(),
    });

    render(<Payment />);
    expect(screen.getByText(/Network Error/i)).toBeInTheDocument();
  });

  it('displays "No payments found" when payments list is empty', () => {
    useGetPayments.mockReturnValue({
      payments: [],
      loading: false,
      error: null,
      currentPage: 1,
      setCurrentPage: jest.fn(),
    });

    render(<Payment />);
    expect(screen.getByText(/No rows found/i)).toBeInTheDocument();
  });

  it('displays a loading indicator while fetching payments', () => {
    useGetPayments.mockReturnValue({
      payments: [],
      loading: true,
      error: null,
      currentPage: 1,
      setCurrentPage: jest.fn(),
    });

    render(<Payment />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});
