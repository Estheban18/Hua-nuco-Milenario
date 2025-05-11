import React, { useState } from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import NewsletterForm from './NewsletterForm';
import '../styles/Footer.css';

const Footer = () => {
  const [activeLink, setActiveLink] = useState(null);

  const handleLinkClick = (link) => {
    setActiveLink(link);
    // Scroll to top para una mejor experiencia
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const links = [
    { title: 'Inicio', path: '/' },
    { title: 'Nosotros', path: '/nosotros' },
    { title: 'Lugares Turísticos', path: '/blog?type=lugares' },
    { title: 'Eventos', path: '/blog?type=eventos' },
    { title: 'Galería', path: '/galeria' },
    { title: 'Contacto', path: '/contacto' },
    { title: 'Políticas de Privacidad', path: '/privacidad' },
    { title: 'Términos de Servicio', path: '/terminos' }
  ];

  const socialMedia = [
    { icon: <FaFacebook />, url: 'https://facebook.com/turismohuanuco', name: 'Facebook' },
    { icon: <FaInstagram />, url: 'https://instagram.com/turismohuanuco', name: 'Instagram' },
    { icon: <FaTwitter />, url: 'https://twitter.com/turismohuanuco', name: 'Twitter' },
    { icon: <FaYoutube />, url: 'https://youtube.com/turismohuanuco', name: 'YouTube' }
  ];

  const contactInfo = [
    { icon: <FaMapMarkerAlt />, text: 'Av. Universitaria 123, Huánuco, Perú' },
    { icon: <FaPhone />, text: '+51 999 888 777' },
    { icon: <FaEnvelope />, text: 'info@turismohuanuco.com' },
    { icon: <FaClock />, text: 'Lun-Vie: 9:00 AM - 6:00 PM' }
  ];

  return (
    <footer className="footer-container">
      <div className="footer-top">
        <div className="footer-section">
          <h3>Turismo Huánuco</h3>
          <p>
            Promoviendo el turismo sostenible y mostrando la riqueza cultural,
            natural e histórica de nuestra región . 
          </p>
          <div className="social-links">
            {socialMedia.map((social, index) => (
              <a 
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-section">
          <h3>Enlaces Rápidos</h3>
          <ul className="footer-links">
            {links.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.path}
                  className={activeLink === link.path ? 'active' : ''}
                  onClick={() => handleLinkClick(link.path)}
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contacto</h3>
          <ul className="contact-info">
            {contactInfo.map((item, index) => (
              <li key={index}>
                <span className="contact-icon">{item.icon}</span>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-section">
          <h3>Suscríbete</h3>
          <p>
            Recibe las últimas noticias y ofertas especiales sobre turismo en Huánuco.
          </p>
          <NewsletterForm />
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>
            &copy; {new Date().getFullYear()} Turismo Huánuco. Todos los derechos reservados.
          </p>
          <div className="footer-legal">
            <Link to="/privacidad">Política de Privacidad</Link>
            <span> | </span>
            <Link to="/terminos">Términos de Servicio</Link>
            <span> | </span>
            <Link to="/mapa-del-sitio">Mapa del Sitio</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
