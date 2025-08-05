import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SignIn from './index';

describe('SignIn Component', () => {
  it('renders form inputs and allows user to fill and submit', () => {
    const onSignInSuccess = jest.fn();
    render(
      <MemoryRouter>
        <SignIn onSignInSuccess={onSignInSuccess} />
      </MemoryRouter>
    );
    const usernameInput = screen.getByPlaceholderText(/enter your username/i);
    const passwordInput = screen.getByPlaceholderText(/input your password/i);
    const signInButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(usernameInput, { target: { value: 'rigbe' } });
    fireEvent.change(passwordInput, { target: { value: 'mypassword' } });
    expect(usernameInput.value).toBe('rigbe');
    expect(passwordInput.value).toBe('mypassword');

    fireEvent.click(signInButton);
    expect(onSignInSuccess).toHaveBeenCalled();
  });

  it('shows alert if username or password is missing', () => {
    window.alert = jest.fn();
    const onSignInSuccess = jest.fn();
    render(
      <MemoryRouter>
        <SignIn onSignInSuccess={onSignInSuccess} />
      </MemoryRouter>
    );
    const signInButton = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(signInButton);
    expect(window.alert).toHaveBeenCalledWith('Please enter username and password.');
    expect(onSignInSuccess).not.toHaveBeenCalled();
  });
});