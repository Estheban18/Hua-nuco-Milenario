import React from 'react';
import '../styles/Loading.css';

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-content">
        <div className="spinner"></div>
        <h2>Cargando Turismo Huánuco</h2>
        <p>Preparando una experiencia inolvidable...</p>
      </div>
    </div>
  );
};

export default Loading;
