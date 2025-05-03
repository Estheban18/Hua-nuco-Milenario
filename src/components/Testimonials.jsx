import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaChevronLeft, FaChevronRight, FaQuoteLeft } from 'react-icons/fa';
import '../styles/Testimonials.css';

const Testimonials = ({ testimonios }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  // Autoplay functionality
  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonios.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000);

    return () => clearInterval(interval);
  }, [testimonios, autoplay]);

  const handlePrev = () => {
    setAutoplay(false);
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonios.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setAutoplay(false);
    setDirection(1);
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonios.length - 1 ? 0 : prevIndex + 1
    );
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={i < rating ? 'star filled' : 'star'}
      />
    ));
  };

  if (!testimonios || testimonios.length === 0) {
    return null;
  }

  // Variants for animations
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.4
      }
    })
  };

  const backgroundVariants = {
    initial: {
      backgroundPosition: "0% 0%"
    },
    animate: {
      backgroundPosition: "100% 100%",
      transition: {
        duration: 20,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  return (
    <motion.section
      className="testimonials-section"
      initial="initial"
      animate="animate"
      variants={backgroundVariants}
    >
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        Lo que dicen nuestros visitantes
      </motion.h2>

      <div className="testimonials-container">
        <motion.button
          className="testimonial-nav prev"
          onClick={handlePrev}
          aria-label="Testimonio anterior"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaChevronLeft />
        </motion.button>

        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            className="testimonial"
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <div className="testimonial-content">
              <motion.div
                className="testimonial-image"
                whileHover={{ scale: 1.05, rotate: 3 }}
              >
                <img
                  src={testimonios[currentIndex].imagen || '/images/testimonials/placeholder.jpg'}
                  alt={testimonios[currentIndex].nombre}
                />
              </motion.div>

              <div className="testimonial-text">
                <p className="quote">
                  <FaQuoteLeft style={{ marginRight: '8px', opacity: 0.4, fontSize: '1.2rem' }} />
                  {testimonios[currentIndex].texto}
                </p>
                <motion.div
                  className="testimonial-rating"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  {renderStars(testimonios[currentIndex].rating)}
                </motion.div>
                <motion.p
                  className="testimonial-author"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  {testimonios[currentIndex].nombre}
                  <span className="testimonial-origin">{testimonios[currentIndex].origen}</span>
                </motion.p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <motion.button
          className="testimonial-nav next"
          onClick={handleNext}
          aria-label="Testimonio siguiente"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaChevronRight />
        </motion.button>
      </div>

      <div className="testimonial-dots">
        {testimonios.map((_, index) => (
          <motion.button
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => {
              setAutoplay(false);
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            aria-label={`Ver testimonio ${index + 1}`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.3 }}
          />
        ))}
      </div>
    </motion.section>
  );
};

export default Testimonials;
