import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { TurismoContext } from '../context/TurismoContext';
import TeamMember from './TeamMember';
import Testimonials from './Testimonials';
import '../styles/Nosotros.css';

const Nosotros = () => {
  const { equipo, testimonios } = useContext(TurismoContext);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="nosotros-container"
    >
      <section className="hero-nosotros">
        <div className="hero-content">
          <h1>Conoce más sobre Turismo Huánuco</h1>
          <p>Descubre nuestra pasión por mostrar lo mejor de nuestra región</p>
        </div>
      </section>

      <section className="mision-vision">
        <div className="card">
          <h2>Misión</h2>
          <p>
            Promover el turismo sostenible en Huánuco, mostrando su riqueza cultural,
            natural e histórica, contribuyendo al desarrollo económico local.
          </p>
        </div>
        <div className="card">
          <h2>Visión</h2>
          <p>
            Ser el referente principal de información turística de Huánuco, reconocidos
            por nuestra autenticidad y compromiso con la comunidad.
          </p>
        </div>
      </section>

      <section className="equipo">
        <h2>Nuestro Equipo</h2>
        <div className="team-grid">
          {equipo.map((miembro, index) => (
            <TeamMember 
              key={miembro.id}
              miembro={miembro}
              delay={index * 0.1}
            />
          ))}
        </div>
      </section>

      <Testimonials testimonios={testimonios} />
    </motion.div>
  );
};

export default Nosotros;
