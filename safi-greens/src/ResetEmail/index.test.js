import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ResetEmail from './index';

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('ResetEmail Component', () => {
  test('renders logo, input and buttons', () => {
    render(<ResetEmail />);
    expect(screen.getByAltText('Safi Greens logo')).toBeInTheDocument();
    expect(screen.getByText('Reset Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('admin@gmail.com')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Continue')).toBeInTheDocument();
  });

  test('shows error message for invalid email', async () => {
    render(<ResetEmail />);
    const emailInput = screen.getByPlaceholderText('admin@gmail.com');
    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
    fireEvent.click(screen.getByText('Continue'));
    expect(await screen.findByText('Invalid email address')).toBeInTheDocument();
  });

  test('submits form when valid email is entered', async () => {
    render(<ResetEmail />);
    const emailInput = screen.getByPlaceholderText('admin@gmail.com');
    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.click(screen.getByText('Continue'));
    // Wait for possible error message to NOT appear
    await waitFor(() => {
      expect(screen.queryByText('Invalid email address')).not.toBeInTheDocument();
    });
  });

  test('shows required message when email is empty', async () => {
    render(<ResetEmail />);
    fireEvent.click(screen.getByText('Continue'));
    expect(await screen.findByText('Required')).toBeInTheDocument();
  });
});