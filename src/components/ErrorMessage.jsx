import React from 'react';
import '../styles/ErrorMessage.css';

const ErrorMessage = ({ message }) => {
  return (
    <div className="error-message-container">
      <div className="error-icon">⚠️</div>
      <h3>Ha ocurrido un error</h3>
      <p>{message || 'Algo salió mal. Por favor, intenta de nuevo más tarde.'}</p>
    </div>
  );
};

export default ErrorMessage;
