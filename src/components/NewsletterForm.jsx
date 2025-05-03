import React, { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../styles/NewsletterForm.css';

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) return;
    
    setLoading(true);
    setMessage(null);
    
    try {
      // Simulación de envío a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage({
        type: 'success',
        text: '¡Gracias por suscribirte! Pronto recibirás noticias.'
      });
      setEmail('');
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Hubo un problema al procesar tu solicitud. Inténtalo de nuevo.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="newsletter-form" onSubmit={handleSubmit}>
      {message && (
        <div className={`newsletter-message ${message.type}`}>
          {message.text}
        </div>
      )}
      
      <div className="input-group">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Tu correo electrónico"
          required
        />
        <button 
          type="submit" 
          disabled={loading || !email.trim()}
        >
          {loading ? (
            <span className="loading-spinner"></span>
          ) : (
            <FaPaperPlane />
          )}
        </button>
      </div>
      
      <p className="privacy-notice">
        Al suscribirte, aceptas nuestra <Link to="/privacidad">Política de Privacidad</Link>
      </p>
    </form>
  );
};

export default NewsletterForm;
