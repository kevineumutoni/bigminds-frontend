import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Modal from '.';

describe('Modal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    children: <div data-testid="modal-content">Test Content</div>,
  };

  const renderWithTheme = (component, themeMode = 'light') => {
    const theme = createTheme({
      palette: {
        mode: themeMode,
      },
    });
    return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
  };

  test('does not render when isOpen is false', () => {
    const { container } = renderWithTheme(<Modal {...defaultProps} isOpen={false} />);
    expect(container).toBeEmptyDOMElement();
  });

  test('renders modal when isOpen is true', () => {
    renderWithTheme(<Modal {...defaultProps} />);
    expect(screen.getByTestId('modal-content')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('×')).toBeInTheDocument();
  });

  test('applies correct light theme styles', () => {
    renderWithTheme(<Modal {...defaultProps} />);
    const modalContent = screen.getByTestId('modal-content').parentElement;
    expect(modalContent).toHaveStyle({
      backgroundColor: '#ffffff',
      color: '#000',
    });
    const closeButton = screen.getByRole('button');
    expect(closeButton).toHaveStyle({
      color: '#000',
    });
  });

  test('applies correct dark theme styles', () => {
    renderWithTheme(<Modal {...defaultProps} />, 'dark');
    const modalContent = screen.getByTestId('modal-content').parentElement;
    expect(modalContent).toHaveStyle({
      backgroundColor: '#141b2d',
      color: '#fff',
    });
    const closeButton = screen.getByRole('button');
    expect(closeButton).toHaveStyle({
      color: '#fff',
    });
  });

  test('calls onClose when close button is clicked', () => {
    renderWithTheme(<Modal {...defaultProps} />);
    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  test('renders children content', () => {
    renderWithTheme(<Modal {...defaultProps} />);
    expect(screen.getByTestId('modal-content')).toHaveTextContent('Test Content');
  });

  test('has correct class names', () => {
    renderWithTheme(<Modal {...defaultProps} />);
    expect(screen.getByTestId('modal-content').parentElement).toHaveClass('modal-content');
    expect(screen.getByTestId('modal-content').parentElement.parentElement).toHaveClass('modal-overlay');
    expect(screen.getByRole('button')).toHaveClass('close-button');
  });
});