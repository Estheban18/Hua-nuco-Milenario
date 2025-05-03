import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import '../styles/EventsCarousel.css';

const EventsCarousel = ({ eventos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left

  useEffect(() => {
    if (!eventos || eventos.length === 0) return;

    // Auto-advance carousel
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, eventos]);

  if (!eventos || eventos.length === 0) {
    return (
      <div className="no-events">
        <p>No hay eventos próximos disponibles en este momento.</p>
      </div>
    );
  }

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? eventos.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => 
      prevIndex === eventos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0
    })
  };

  return (
    <div className="events-carousel">
      <button 
        className="carousel-nav prev"
        onClick={handlePrev}
        aria-label="Evento anterior"
      >
        <FaChevronLeft />
      </button>
      
      <div className="carousel-container">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="event-slide"
          >
            <div className="event-image">
              <img 
                src={eventos[currentIndex].imagen || '/images/events/placeholder.jpg'} 
                alt={eventos[currentIndex].nombre} 
              />
            </div>
            
            <div className="event-info">
              <h3>{eventos[currentIndex].nombre}</h3>
              
              <div className="event-details">
                <p className="event-date">
                  <FaCalendarAlt /> {eventos[currentIndex].fecha}
                </p>
                <p className="event-location">
                  <FaMapMarkerAlt /> {eventos[currentIndex].lugar}
                </p>
              </div>
              
              <p className="event-description">
                {eventos[currentIndex].descripcion}
              </p>
              
              <Link to={`/eventos/${eventos[currentIndex].id}`} className="btn btn-sm">
                Más información
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      <button 
        className="carousel-nav next"
        onClick={handleNext}
        aria-label="Evento siguiente"
      >
        <FaChevronRight />
      </button>
      
      <div className="carousel-indicators">
        {eventos.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            aria-label={`Ver evento ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default EventsCarousel;
