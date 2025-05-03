import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/FeaturedPlaces.css';

const FeaturedPlaces = ({ lugares }) => {
  if (!lugares || lugares.length === 0) {
    return (
      <div className="no-places">
        <p>No hay lugares destacados disponibles en este momento.</p>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div 
      className="featured-places"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {lugares.map((lugar) => (
        <motion.div 
          key={lugar.id} 
          className="place-card"
          variants={itemVariants}
        >
          <div className="place-image">
            <img src={lugar.imagen || '/images/placeholder.jpg'} alt={lugar.nombre} />
            {lugar.destacado && (
              <div className="featured-badge">Destacado</div>
            )}
          </div>
          
          <div className="place-info">
            <h3>{lugar.nombre}</h3>
            <p className="place-location">{lugar.ubicacion}</p>
            <p className="place-description">
              {lugar.descripcion.length > 100 
                ? `${lugar.descripcion.substring(0, 100)}...` 
                : lugar.descripcion}
            </p>
            <Link to={`/lugares/${lugar.id}`} className="btn btn-sm">
              Ver detalles
            </Link>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default FeaturedPlaces;
