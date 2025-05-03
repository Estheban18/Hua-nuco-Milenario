import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaMapMarkedAlt, FaPaperPlane } from 'react-icons/fa';
import '../styles/Contacto.css';

const Contacto = () => {
  return (
    <section className="content-section contact-section active" id="contacto-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-5 mb-5 mb-lg-0">
            <div className="contact-info">
              <h3>Contáctanos</h3>
              <p><FaMapMarkerAlt className="contact-icon" /> Huanuco</p>
              <p><FaPhoneAlt className="contact-icon" /> +51 973027816</p>
              <p><FaEnvelope className="contact-icon" /> Huanuco2025@gmail.com</p>
              <p><FaClock className="contact-icon" /> Lunes a Viernes: 8:00 - 18:00</p>
              <p><FaMapMarkedAlt className="contact-icon" /> Sábados: 9:00 - 13:00</p>
            </div>
          </div>
          <div className="col-lg-7">
            <form className="contact-form">
              <div className="row">
                <div className="col-md-6">
                  <input type="text" className="form-control" placeholder="Nombre" required />
                </div>
                <div className="col-md-6">
                  <input type="email" className="form-control" placeholder="Email" required />
                </div>
              </div>
              <input type="text" className="form-control" placeholder="Asunto" required />
              <textarea className="form-control" placeholder="Mensaje" required></textarea>
              <button type="submit" className="btn btn-primary w-100">
                <FaPaperPlane className="me-1" />Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacto;
