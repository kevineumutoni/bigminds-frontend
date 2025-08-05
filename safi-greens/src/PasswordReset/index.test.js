import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PasswordReset from './index';

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));
describe('PasswordReset Component', () => {
  test('renders all input fields and buttons', () => {
    render(<PasswordReset />);
    expect(screen.getByText('Reset Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter code')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Create new password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm password')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Continue')).toBeInTheDocument();
  });
  test('shows validation error when submitted empty', async () => {
    render(<PasswordReset />);
    fireEvent.click(screen.getByText('Continue'));
    expect(await screen.findByText('Required')).toBeInTheDocument();
  });
  test('password fields stay disabled until valid code is entered', () => {
    render(<PasswordReset />);
    const passwordInput = screen.getByPlaceholderText('Create new password');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm password');
    expect(passwordInput).toBeDisabled();
    expect(confirmPasswordInput).toBeDisabled();
  });
});