import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/ArticleCard.css';

const ArticleCard = ({ item, type, index }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        delay: index * 0.1
      }
    }
  };

  return (
    <motion.div
      className="article-card"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="article-image">
        <img src={item.imagen || '/images/placeholder.jpg'} alt={item.nombre} />
        <div className="article-category">
          {item.categoria}
        </div>
      </div>
      
      <div className="article-content">
        <h3>{item.nombre}</h3>
        
        {type === 'lugares' && (
          <p className="article-location">
            <span className="icon">📍</span> {item.ubicacion}
          </p>
        )}
        
        {type === 'eventos' && (
          <p className="article-date">
            <span className="icon">📅</span> {item.fecha}
          </p>
        )}
        
        <p className="article-description">
          {item.descripcion.length > 120 
            ? `${item.descripcion.substring(0, 120)}...` 
            : item.descripcion}
        </p>
        
        <Link 
          to={`/${type}/${item.id}`} 
          className="read-more"
        >
          Leer más
        </Link>
      </div>
    </motion.div>
  );
};

export default ArticleCard;
