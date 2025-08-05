import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import ProductsTable from './index.js'; 
import { useVendorProducts } from '../hooks/useVendorProducts';

jest.mock('../hooks/useVendorProducts');

describe('ProductsTable Component', () => {
  const mockVendorProducts = [
    {
      product_details_id: '1',
      price: 100,
      vendor: { name: 'Vendor A' },
      product: {
        name: 'Apple',
        category: 'Fruit',
        unit: 'Kg',
        product_image: 'http://pinterest.com/apple.jpg',
      },
    },
    {
      product_details_id: '2',
      price: 50,
      vendor: { name: 'Vendor B' },
      product: {
        name: 'Carrot',
        category: 'Vegetable',
        unit: 'Kg',
        product_image: 'http://pinterest.com/carrot.jpg',
      },
    },
    {
      product_details_id: '3',
      price: 200,
      vendor: { name: 'Vendor C' },
      product: {
        name: 'Banana',
        category: 'Fruit',
        unit: 'Dozen',
        product_image: 'http://pinterest.com/banana.jpg',
      },
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders product data correctly', () => {
    useVendorProducts.mockReturnValue({
      vendorProducts: mockVendorProducts,
      loading: false,
      error: null,
    });

    render(<ProductsTable />);

    const table = screen.getByRole('table');
    const { getAllByRole, getAllByText, getByText } = within(table);

    expect(getAllByRole('row').length).toBe(4); 
    expect(getByText('Apple')).toBeInTheDocument();

    const fruitCells = getAllByText('Fruit');
    expect(fruitCells.length).toBeGreaterThan(0);

    const kgCells = getAllByText('Kg');
    expect(kgCells.length).toBeGreaterThan(0);

    expect(getByText('KES 100')).toBeInTheDocument();
    expect(getByText('Vendor A')).toBeInTheDocument();
  });

  it('filters products by search term', () => {
    useVendorProducts.mockReturnValue({
      vendorProducts: mockVendorProducts,
      loading: false,
      error: null,
    });

    render(<ProductsTable />);

    const inputs = screen.getAllByLabelText(/search by fruit or vegetable/i);
    const searchInput = inputs[0];

    fireEvent.change(searchInput, { target: { value: 'Banana' } });

    const table = screen.getByRole('table');
    const { queryByText, getByText } = within(table);

    expect(getByText('Banana')).toBeInTheDocument();
    expect(queryByText('Apple')).not.toBeInTheDocument();
    expect(queryByText('Carrot')).not.toBeInTheDocument();
  });

  it('filters products by category - Fruit', () => {
    useVendorProducts.mockReturnValue({
      vendorProducts: mockVendorProducts,
      loading: false,
      error: null,
    });

    render(<ProductsTable />);

    const filterSelect = screen.getByLabelText(/filter by fruit or vegetable/i);
    fireEvent.mouseDown(filterSelect);
    const fruitOption = screen.getByRole('option', { name: 'Fruit' });
    fireEvent.click(fruitOption);

    const table = screen.getByRole('table');
    const { getByText, queryByText } = within(table);

    expect(getByText('Apple')).toBeInTheDocument();
    expect(getByText('Banana')).toBeInTheDocument();
    expect(queryByText('Carrot')).not.toBeInTheDocument();
  });

  it('filters products by category - Vegetable', () => {
    useVendorProducts.mockReturnValue({
      vendorProducts: mockVendorProducts,
      loading: false,
      error: null,
    });

    render(<ProductsTable />);

    const filterSelect = screen.getByLabelText(/filter by fruit or vegetable/i);
    fireEvent.mouseDown(filterSelect);
    const vegetableOption = screen.getByRole('option', { name: 'Vegetable' });
    fireEvent.click(vegetableOption);

    const table = screen.getByRole('table');
    const { getByText, queryByText } = within(table);

    expect(getByText('Carrot')).toBeInTheDocument();
    expect(queryByText('Apple')).not.toBeInTheDocument();
    expect(queryByText('Banana')).not.toBeInTheDocument();
  });

  it('displays loading indicator when loading', () => {
    useVendorProducts.mockReturnValue({
      vendorProducts: [],
      loading: true,
      error: null,
    });

    render(<ProductsTable />);

    expect(screen.getByText(/loading products\.\.\./i)).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('displays error message when error exists', () => {
    useVendorProducts.mockReturnValue({
      vendorProducts: [],
      loading: false,
      error: 'Failed to load',
    });

    render(<ProductsTable />);

    expect(screen.getByText(/failed to load/i)).toBeInTheDocument();
  });

  it('displays "No products found." when no products available or filtered out', () => {
    useVendorProducts.mockReturnValue({
      vendorProducts: [],
      loading: false,
      error: null,
    });

    render(<ProductsTable />);
    expect(screen.getByText(/no products found\./i)).toBeInTheDocument();

  
    useVendorProducts.mockReturnValue({
      vendorProducts: mockVendorProducts,
      loading: false,
      error: null,
    });

    render(<ProductsTable />);
    const inputs = screen.getAllByLabelText(/search by fruit or vegetable/i);
    const searchInput = inputs[0];
    fireEvent.change(searchInput, { target: { value: 'NonExistentProduct' } });
    expect(screen.getByText(/no products found\./i)).toBeInTheDocument();
  });
});
