import React from 'react';
import { useTheme } from '@mui/material/styles';
import './style.css';

const Modal = ({ isOpen, onClose, children }) => {
  const theme = useTheme();

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div 
        className="modal-content" 
        style={{
          backgroundColor: theme.palette.mode === 'dark' ? '#141b2d' : '#ffffff',
          color: theme.palette.mode === 'dark' ? '#fff' : '#000',
        }}
      >
        <button 
          className="close-button" 
          onClick={onClose}
          style={{
            color: theme.palette.mode === 'dark' ? '#fff' : '#000',
          }}
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;