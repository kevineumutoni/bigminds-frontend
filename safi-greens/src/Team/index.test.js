import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TeamTable from './index';
import { ThemeProvider, createTheme } from '@mui/material/styles';

jest.mock('./components/Team-gauges/index', () => ({ value, description }) => (
  <div data-testid="gauge-card">{description}: {value}</div>
));

const mockTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const ThemeWrapper = ({ children }) => (
  <ThemeProvider theme={mockTheme}>{children}</ThemeProvider>
);

describe('TeamTable Component', () => {
  test('renders header, filters, and table headers', () => {
    render(<TeamTable />, { wrapper: ThemeWrapper });

    expect(screen.getByRole('heading', { name: /team/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/search by name/i)).toBeInTheDocument();
    expect(screen.getByText(/all/i)).toBeInTheDocument();

    expect(screen.getByRole('columnheader', { name: /id/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /name/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /location/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /phone/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /access/i })).toBeInTheDocument();
  });

  test('displays all team members initially', () => {
    render(<TeamTable />, { wrapper: ThemeWrapper });

    ['Fana Asmelash', 'Kevine Umutoni', 'Nebyat Hailu', 'Rigbe Weleslase', 'Hewaan Mehari', 'Tirsit Berihu'].forEach(name => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });

    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(7);
  });

  test('filters team members by search term', () => {
    render(<TeamTable />, { wrapper: ThemeWrapper });

    fireEvent.change(screen.getByPlaceholderText(/search by name/i), {
      target: { value: 'fana' },
    });

    expect(screen.getByText('Fana Asmelash')).toBeInTheDocument();
    expect(screen.queryByText('Kevine Umutoni')).not.toBeInTheDocument();
  });

  test('filters team members by access dropdown (Admin)', async () => {
    render(<TeamTable />, { wrapper: ThemeWrapper });

    fireEvent.click(screen.getByText(/all/i));
    const adminOption = await screen.findByText('Admin');
    fireEvent.click(adminOption);

    ['Fana Asmelash', 'Kevine Umutoni', 'Nebyat Hailu', 'Rigbe Weleslase'].forEach(name => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });

    ['Hewaan Mehari', 'Tirsit Berihu'].forEach(name => {
      expect(screen.queryByText(name)).not.toBeInTheDocument();
    });

    expect(screen.getByText('Admin')).toBeInTheDocument();
  });

  test('filters team members by access dropdown (Manager)', async () => {
    render(<TeamTable />, { wrapper: ThemeWrapper });

    fireEvent.click(screen.getByText(/all/i));
    const managerOption = await screen.findByText('Manager');
    fireEvent.click(managerOption);

    ['Hewaan Mehari', 'Tirsit Berihu'].forEach(name => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });

    ['Fana Asmelash', 'Kevine Umutoni'].forEach(name => {
      expect(screen.queryByText(name)).not.toBeInTheDocument();
    });

    expect(screen.getByText('Manager')).toBeInTheDocument();
  });

  test('shows "No team members match" when search shows no results', () => {
    render(<TeamTable />, { wrapper: ThemeWrapper });

    fireEvent.change(screen.getByPlaceholderText(/search by name/i), {
      target: { value: 'notfound' },
    });

    expect(screen.getByText(/No team members match your search/i)).toBeInTheDocument();
  });

  test('gauge cards display values and labels', () => {
    render(<TeamTable />, { wrapper: ThemeWrapper });

    const gaugeCards = screen.getAllByTestId('gauge-card');
    expect(gaugeCards).toHaveLength(3);

    expect(gaugeCards[0]).toHaveTextContent('Total Team Members');
    expect(gaugeCards[0]).toHaveTextContent('6');

    expect(gaugeCards[1]).toHaveTextContent('Admins');
    expect(gaugeCards[1]).toHaveTextContent('4');

    expect(gaugeCards[2]).toHaveTextContent('Managers');
    expect(gaugeCards[2]).toHaveTextContent('2');
  });

  test('filters by both search term and access dropdown', async () => {
    render(<TeamTable />, { wrapper: ThemeWrapper });

    fireEvent.change(screen.getByPlaceholderText(/search by name/i), {
      target: { value: 'nebyat' },
    });
    fireEvent.click(screen.getByText(/all/i));
    const adminOption = await screen.findByText('Admin');
    fireEvent.click(adminOption);

    expect(screen.getByText('Nebyat Hailu')).toBeInTheDocument();
    expect(screen.queryByText('Fana Asmelash')).not.toBeInTheDocument();
    expect(screen.queryByText('Hewaan Mehari')).not.toBeInTheDocument();
  });

  test('dropdown closes when clicking outside', () => {
    render(<TeamTable />, { wrapper: ThemeWrapper });

    const dropdownToggle = screen.getByText(/all/i, { selector: '.dropdown-selected' });
    fireEvent.click(dropdownToggle);
    expect(dropdownToggle).toBeInTheDocument();

    fireEvent.mouseDown(screen.getByRole('heading', { name: /team/i }));

  
    expect(screen.queryByRole('list')).not.toBeInTheDocument();

        expect(screen.queryAllByText('All')).toHaveLength(1);

    expect(screen.queryByText('Admin')).not.toBeInTheDocument();
    expect(screen.queryByText('Manager')).not.toBeInTheDocument();
  });
});
