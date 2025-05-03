import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { TurismoContext } from '../context/TurismoContext';
import ArticleCard from './ArticleCard';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import '../styles/Blog.css';

const Blog = () => {
  const { lugares, eventos, loading, error } = useContext(TurismoContext);
  const [activeTab, setActiveTab] = useState('lugares');
  const [searchTerm, setSearchTerm] = useState('');

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  const filteredItems = activeTab === 'lugares' 
    ? lugares.filter(lugar => 
        lugar.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lugar.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : eventos.filter(evento => 
        evento.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        evento.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="blog-container"
    >
      <div className="blog-header">
        <h1>Explora Huánuco</h1>
        <p>Descubre los mejores lugares y eventos de nuestra región</p>
        
        <div className="search-bar">
          <input
            type="text"
            placeholder={`Buscar ${activeTab === 'lugares' ? 'lugares' : 'eventos'}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="tabs">
          <button
            className={activeTab === 'lugares' ? 'active' : ''}
            onClick={() => setActiveTab('lugares')}
          >
            Lugares Turísticos
          </button>
          <button
            className={activeTab === 'eventos' ? 'active' : ''}
            onClick={() => setActiveTab('eventos')}
          >
            Eventos Culturales
          </button>
        </div>
      </div>

      <div className="articles-grid">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <ArticleCard 
              key={item.id}
              item={item}
              type={activeTab}
              index={index}
            />
          ))
        ) : (
          <div className="no-results">
            <h3>No se encontraron resultados</h3>
            <p>Intenta con otros términos de búsqueda</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Blog;
