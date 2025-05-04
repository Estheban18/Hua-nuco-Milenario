import React, { useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TurismoContext } from '../context/TurismoContext';
import FeaturedPlaces from './FeaturedPlaces';
import EventsCarousel from './EventsCarousel';
import '../styles/Home.css';

const Home = () => {
  const { lugares, eventos, fetchData } = useContext(TurismoContext);

  useEffect(() => {
    // Cargar datos si aún no están cargados
    if (lugares.length === 0 || eventos.length === 0) {
      fetchData();
    }
  }, [fetchData, lugares.length, eventos.length]);

  const heroVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="home-container">
      <motion.section
        className="hero-section"
        initial="hidden"
        animate="visible"
        variants={heroVariants}
      >
        <div className="hero-content">
          <h1>Descubre Huánuco</h1>
          <p>Explora la belleza natural, historia y cultura de nuestra región</p>
          <div className="hero-buttons">
            <Link to="/blog" className="btn btn-primary">Explorar Destinos</Link>
            <Link to="/contacto" className="btn btn-secondary">Contactar</Link>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="about-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="section-header">
          <h2>Bienvenidos a Huánuco</h2>
          <p>Conoce la tierra de la eterna primavera</p>
        </div>
        <div className="about-content">
          <div className="about-text">
            <p>
              Huánuco, conocida como "La Ciudad de la Eterna Primavera", es una región
              privilegiada del Perú que combina un clima agradable, paisajes impresionantes
              y una rica historia cultural.
            </p>
            <p>
              Desde las majestuosas ruinas de Kotosh hasta los hermosos valles y ríos,
              Huánuco ofrece experiencias inolvidables para todo tipo de viajeros.
            </p>
            <Link to="/nosotros" className="btn btn-outline">Conoce más</Link>
          </div>
          <div className="about-image">
            <img src="images/5130364698_5c4b92eb91_b.jpg" alt="Panorámica de Huánuco" />
          </div>
        </div>
      </motion.section>

      <motion.section
        className="featured-places-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="section-header">
          <h2>Destinos Destacados</h2>
          <p>Los lugares más populares para visitar</p>
        </div>
        <FeaturedPlaces lugares={lugares.slice(0, 4)} />
        <div className="section-footer">
          <Link to="/blog?type=lugares" className="btn btn-outline">Ver todos los destinos</Link>
        </div>
      </motion.section>

      <motion.section
        className="events-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="section-header">
          <h2>Próximos Eventos</h2>
          <p>Festividades y actividades culturales</p>
        </div>
        <EventsCarousel eventos={eventos.slice(0, 6)} />
        <div className="section-footer">
          <Link to="/blog?type=eventos" className="btn btn-outline">Ver todos los eventos</Link>
        </div>
      </motion.section>

      <motion.section
        className="cta-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="cta-content">
          <h2>¿Listo para tu próxima aventura?</h2>
          <p>Planifica tu viaje a Huánuco y descubre todo lo que tenemos para ofrecer</p>
          <Link to="/contacto" className="btn btn-primary">Contáctanos</Link>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
