import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/Error404.css';

const Error404 = () => {
  return (
    <motion.div 
      className="error-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="error-content">
        <h1>404</h1>
        <h2>Página no encontrada</h2>
        <p>Lo sentimos, la página que estás buscando no existe o ha sido movida.</p>
        <div className="error-actions">
          <Link to="/" className="btn btn-primary">Volver al inicio</Link>
          <Link to="/blog" className="btn btn-secondary">Explorar destinos</Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Error404;
