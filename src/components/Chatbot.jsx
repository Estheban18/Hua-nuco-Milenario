import React, { useState, useEffect, useRef } from 'react';
import { FaRobot, FaTimes, FaPaperPlane, FaExpandAlt, FaCompressAlt } from 'react-icons/fa';
import '../styles/Chatbot.css';

const simulateResponse = (message) => {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('atractivos') || lowerMessage.includes('turísticos') || lowerMessage.includes('visitar')) {
    return "Mira pe causa, en Huánuco tenemos tremendos lugares para visitar: Kotosh con su Templo de las Manos Cruzadas bien bacán, el Parque Nacional de Tingo María que es una belleza, la Cueva de las Lechuzas que está de la patada, la Laguna de los Milagros bien chévere y Huánuco Pampa que es un jato incaico alucinante.";
  } else if (lowerMessage.includes('llego') || lowerMessage.includes('llegar') || lowerMessage.includes('transporte')) {
    return "Papi, de Lima a Huánuco te vienes en bus nomás, son como 8-10 horitas, o si tienes más billete, en avión son 45 minutitos pe. Ya estando acá, hay colectivos y mototaxis para moverte por todos lados, recontra barato.";
  } else if (lowerMessage.includes('festival') || lowerMessage.includes('eventos') || lowerMessage.includes('culturales')) {
    return "Asu mare, este mes está cargadazo: tenemos el Festival de la Danza de los Negritos el 26 de diciembre que es una bomba, la Semana Turística de Huánuco en la primera semana que está de la patada, y el Festival Gastronómico Regional al final del mes donde comes hasta reventar, causa.";
  } else if (lowerMessage.includes('alojamiento') || lowerMessage.includes('hotel') || lowerMessage.includes('hostal')) {
    return "Tranqui nomás, hay full jatos baratos en el centro: el Hostal El Viajero, el Hotel Garu y el Hospedaje Los Portales están firmes. Te cobran entre 30 y 80 soles la noche, una ganga pe.";
  } else if (lowerMessage.includes('comida') || lowerMessage.includes('gastronomía') || lowerMessage.includes('platos')) {
    return "Ufff, la comida de Huánuco es un manjar, papá. Tienes que probar el Picante de Cuy que está de rechupete, la Pachamanca que es un monumento, el Locro de Gallina bien cremosito, el Juane de Yuca que es una bomba y los dulcecitos como el Manjar Blanco que te hacen chupar los dedos.";
  } else if (lowerMessage.includes('clima') || lowerMessage.includes('tiempo') || lowerMessage.includes('temperatura')) {
    return "Acá en Huánuco el clima es una maravilla pe, por eso le dicen 'La Ciudad de la Eterna Primavera'. Hace 24 graditos en promedio, días con sol a full y noches fresquitas para dormir como un rey, causa.";
  } else {
    return "Oye causa, gracias por la consulta, pero sé más específico pe. ¿Quieres saber de atractivos turísticos, alojamiento, comida, transporte o eventos culturales en Huánuco? Avísame nomás y te cuento todo al toque.";
  }
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef(null);
  const chatWindowRef = useRef(null);

  const preguntasFrecuentes = [
    "¿Qué lugares bacanes hay para visitar pe?",
    "¿Cómo me jalo a Huánuco desde Lima, causa?",
    "¿Qué festivales con buena música y juerga hay este mes?",
    "¿Dónde encuentro un jato barato para quedarme, papi?"
  ];

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          text: "¡Qué tal causa! Soy Huani pe, tu pata virtual para turistear por Huánuco. ¿En qué te echo una manito hoy día?",
          sender: "bot"
        },
        {
          text: "Puedes consultarme sobre estas cosas, papá:",
          sender: "bot"
        },
        {
          text: preguntasFrecuentes.join("\n• "),
          sender: "bot"
        },
        {
          text: "Dato: Puedes agrandar o achicar esta ventana jalando la esquina inferior derecha o usando el botón de expandir arriba.",
          sender: "bot"
        }
      ]);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = { text: inputValue, sender: "user" };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const mockResponse = {
        data: {
          reply: simulateResponse(inputValue)
        }
      };

      const response = mockResponse;

      setTimeout(() => {
        setMessages(prev => [...prev, {
          text: response.data.reply || "Lo siento, no entendí tu pregunta. ¿Podrías reformularla?",
          sender: "bot"
        }]);
        setIsTyping(false);
      }, 1000);
    } catch (error) {
      console.error("Error al conectar con el chatbot:", error);
      setMessages(prev => [...prev, {
        text: "Estoy teniendo problemas para responder. Por favor intenta más tarde.",
        sender: "bot"
      }]);
      setIsTyping(false);
    }
  };

  const handleQuickQuestion = (question) => {
    setInputValue(question);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);

    if (chatWindowRef.current) {
      if (!isExpanded) {
        // Expandir a pantalla completa
        chatWindowRef.current.style.width = '80vw';
        chatWindowRef.current.style.height = '80vh';
        chatWindowRef.current.style.maxWidth = '1200px';
        chatWindowRef.current.style.maxHeight = '800px';
      } else {
        // Volver al tamaño normal
        chatWindowRef.current.style.width = '320px';
        chatWindowRef.current.style.height = '450px';
      }
    }
  };

  return (
    <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
      {!isOpen ? (
        <button
          className="chatbot-button"
          onClick={() => setIsOpen(true)}
          aria-label="Abrir chatbot"
        >
          <FaRobot size={24} />
        </button>
      ) : (
        <div
          className={`chatbot-window ${isExpanded ? 'expanded' : ''}`}
          ref={chatWindowRef}
        >
          <div className="chatbot-header">
            <h3> Huánuco - Tu Pata Turístico</h3>
            <div className="chatbot-controls">
              <button
                className="expand-button"
                onClick={toggleExpand}
                aria-label={isExpanded ? "Contraer chatbot" : "Expandir chatbot"}
              >
                {isExpanded ? <FaCompressAlt /> : <FaExpandAlt />}
              </button>
              <button
                className="close-button"
                onClick={() => setIsOpen(false)}
                aria-label="Cerrar chatbot"
              >
                <FaTimes />
              </button>
            </div>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.sender}`}
              >
                {msg.text.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            ))}
            {isTyping && (
              <div className="message bot typing">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="quick-questions">
            {preguntasFrecuentes.map((pregunta, i) => (
              <button
                key={i}
                className="quick-question"
                onClick={() => handleQuickQuestion(pregunta)}
              >
                {pregunta}
              </button>
            ))}
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Escribe tu pregunta aquí causa..."
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button
              className="send-button"
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
