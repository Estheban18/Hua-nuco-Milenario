import React, { useState, useEffect, useRef } from 'react';
import { FaRobot, FaTimes, FaPaperPlane, FaExpandAlt, FaCompressAlt, FaMapMarkerAlt, FaHotel, FaUtensils, FaBus, FaCalendarAlt } from 'react-icons/fa';
import '../styles/Chatbot.css';

// Configuración de APIs (en producción esto debería estar en variables de entorno)
const GOOGLE_MAPS_API_KEY = 'TU_API_KEY_DE_GOOGLE_MAPS';
const HOTEL_API_URL = 'https://api.example.com/hotels?location=huanuco&budget=low';
const RESTAURANT_API_URL = 'https://api.example.com/restaurants?location=huanuco';

// Coordenadas de lugares turísticos de Huánuco
const lugaresTuristicos = {
  "kotosh": { lat: -9.9291, lng: -76.2397, nombre: "Kotosh - Templo de las Manos Cruzadas" },
  "tingo-maria": { lat: -9.2897, lng: -75.9964, nombre: "Parque Nacional de Tingo María" },
  "cueva-lechuzas": { lat: -9.2889, lng: -75.9961, nombre: "Cueva de las Lechuzas" },
  "laguna-milagros": { lat: -9.8000, lng: -76.0667, nombre: "Laguna de los Milagros" },
  "huanuco-pampa": { lat: -9.9167, lng: -76.2333, nombre: "Huánuco Pampa" }
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [hotels, setHotels] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const messagesEndRef = useRef(null);
  const chatWindowRef = useRef(null);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  // Preguntas frecuentes con iconos
  const preguntasFrecuentes = [
    { text: "¿Qué lugares turísticos puedo visitar?", icon: <FaMapMarkerAlt /> },
    { text: "¿Dónde puedo encontrar hoteles económicos?", icon: <FaHotel /> },
    { text: "¿Qué platos típicos debo probar?", icon: <FaUtensils /> },
    { text: "¿Cómo llegar a Huánuco desde Lima?", icon: <FaBus /> },
    { text: "¿Qué eventos hay este mes?", icon: <FaCalendarAlt /> }
  ];

  // Cargar la API de Google Maps
  useEffect(() => {
    if (isOpen && !window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
      
      script.onload = () => {
        console.log('Google Maps API cargada');
      };
      
      return () => {
        document.head.removeChild(script);
      };
    }
  }, [isOpen]);

  // Inicializar el mapa cuando se selecciona un lugar
  useEffect(() => {
    if (selectedPlace && window.google && mapRef.current) {
      const lugar = lugaresTuristicos[selectedPlace];
      
      if (!mapInstanceRef.current) {
        mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
          center: { lat: lugar.lat, lng: lugar.lng },
          zoom: 15,
          disableDefaultUI: true,
          zoomControl: true,
          gestureHandling: 'cooperative'
        });
      } else {
        mapInstanceRef.current.setCenter({ lat: lugar.lat, lng: lugar.lng });
        mapInstanceRef.current.setZoom(15);
      }

      if (markerRef.current) {
        markerRef.current.setMap(null);
      }

      markerRef.current = new window.google.maps.Marker({
        position: { lat: lugar.lat, lng: lugar.lng },
        map: mapInstanceRef.current,
        title: lugar.nombre,
        icon: {
          url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
        }
      });

      // Agregar cuadro de información
      const infoWindow = new window.google.maps.InfoWindow({
        content: `<div class="map-info-window"><h3>${lugar.nombre}</h3></div>`
      });
      
      markerRef.current.addListener('click', () => {
        infoWindow.open(mapInstanceRef.current, markerRef.current);
      });
    }
  }, [selectedPlace]);

  // Mensaje de bienvenida
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
          quickReplies: preguntasFrecuentes,
          sender: "bot"
        }
      ]);
    }
  }, [isOpen]);

  // Auto-scroll al final de los mensajes
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Simular consulta a API de hoteles
  const fetchHotels = async () => {
    setIsTyping(true);
    try {
      // En producción, aquí harías una llamada real a la API
      // const response = await fetch(HOTEL_API_URL);
      // const data = await response.json();
      
      // Simulando respuesta de API
      setTimeout(() => {
        const mockHotels = [
          { name: "Hostal El Viajero", price: "S/80", rating: 3.5, location: "Centro de Huánuco" },
          { name: "Hotel Garu", price: "S/120", rating: 4.0, location: "A 2 cuadras de la plaza" },
          { name: "Hospedaje Los Portales", price: "S/60", rating: 3.0, location: "Zona céntrica" }
        ];
        
        setHotels(mockHotels);
        
        setMessages(prev => [...prev, {
          text: "Aquí tienes los hoteles más económicos en Huánuco:",
          sender: "bot",
          hotels: mockHotels
        }]);
        
        setIsTyping(false);
      }, 1500);
    } catch (error) {
      console.error("Error al obtener hoteles:", error);
      setMessages(prev => [...prev, {
        text: "No pude encontrar hoteles en este momento. Por favor intenta más tarde.",
        sender: "bot"
      }]);
      setIsTyping(false);
    }
  };

  // Simular consulta a API de restaurantes
  const fetchRestaurants = async () => {
    setIsTyping(true);
    try {
      // Simulando respuesta de API
      setTimeout(() => {
        const mockRestaurants = [
          { name: "Restaurante El Trigal", specialty: "Picante de Cuy", rating: 4.5 },
          { name: "La Casona de Huánuco", specialty: "Pachamanca", rating: 4.7 },
          { name: "Sabor Norteño", specialty: "Juane de Yuca", rating: 4.3 }
        ];
        
        setRestaurants(mockRestaurants);
        
        setMessages(prev => [...prev, {
          text: "Estos son los mejores lugares para probar la comida típica:",
          sender: "bot",
          restaurants: mockRestaurants
        }]);
        
        setIsTyping(false);
      }, 1500);
    } catch (error) {
      console.error("Error al obtener restaurantes:", error);
      setMessages(prev => [...prev, {
        text: "No pude encontrar restaurantes en este momento. Por favor intenta más tarde.",
        sender: "bot"
      }]);
      setIsTyping(false);
    }
  };

  // Procesar mensajes del usuario
  const processMessage = (message) => {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('atractivos') || lowerMessage.includes('turísticos') || lowerMessage.includes('visitar') || lowerMessage.includes('lugares')) {
      return {
        text: "Mira pe causa, en Huánuco tenemos tremendos lugares para visitar:",
        options: Object.entries(lugaresTuristicos).map(([key, lugar]) => ({
          text: lugar.nombre,
          route: key,
          map: true
        }))
      };
    } else if (lowerMessage.includes('hotel') || lowerMessage.includes('alojamiento') || lowerMessage.includes('hostal')) {
      fetchHotels();
      return { text: "Buscando los mejores hospedajes económicos para ti..." };
    } else if (lowerMessage.includes('comida') || lowerMessage.includes('gastronomía') || lowerMessage.includes('platos')) {
      fetchRestaurants();
      return { text: "Consultando los mejores lugares para probar la comida típica..." };
    } else if (lowerMessage.includes('llego') || lowerMessage.includes('llegar') || lowerMessage.includes('transporte')) {
      return "Papi, de Lima a Huánuco te vienes en bus nomás, son como 8-10 horitas (Ormeno, Movil Tours o León de Huánuco). Si tienes más billete, en avión con Star Perú son 45 minutitos pe. Ya estando acá, hay colectivos y mototaxis para moverte por todos lados, recontra barato.";
    } else if (lowerMessage.includes('festival') || lowerMessage.includes('eventos') || lowerMessage.includes('culturales')) {
      return {
        text: "Asu mare, este mes está cargadazo:",
        events: [
          { name: "Festival de la Danza de los Negritos", date: "26 de Diciembre", location: "Plaza de Armas" },
          { name: "Semana Turística de Huánuco", date: "Primera semana de Enero", location: "Varios lugares" },
          { name: "Festival Gastronómico Regional", date: "15 de Enero", location: "Alameda 28 de Julio" }
        ]
      };
    } else if (lowerMessage.includes('clima') || lowerMessage.includes('tiempo') || lowerMessage.includes('temperatura')) {
      return "Acá en Huánuco el clima es una maravilla pe, por eso le dicen 'La Ciudad de la Eterna Primavera'. Ahora mismo está a 24°C, días con sol a full y noches fresquitas para dormir como un rey, causa.";
    } else {
      return "Oye causa, gracias por la consulta, pero sé más específico pe. ¿Quieres saber de atractivos turísticos, alojamiento, comida, transporte o eventos culturales en Huánuco? Avísame nomás y te cuento todo al toque.";
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = { text: inputValue, sender: "user" };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = processMessage(inputValue);

      setTimeout(() => {
        const newMessages = [...messages, userMessage];
        
        if (typeof response === 'string') {
          newMessages.push({
            text: response,
            sender: "bot"
          });
        } else {
          newMessages.push({
            ...response,
            sender: "bot"
          });
        }
        
        setMessages(newMessages);
        setIsTyping(false);
      }, 1000);
    } catch (error) {
      console.error("Error al procesar el mensaje:", error);
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

  const handleOptionClick = (option) => {
    if (option.map) {
      setSelectedPlace(option.route);
      setMessages(prev => [...prev, {
        text: `Aquí tienes la ubicación de ${option.text}`,
        sender: "bot",
        showMap: true
      }]);
    } else {
      setMessages(prev => [...prev, {
        text: `Perfecto causa, te llevaré a la página de ${option.text}. ¡Vamos allá!`,
        sender: "bot"
      }]);
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);

    if (chatWindowRef.current) {
      if (!isExpanded) {
        chatWindowRef.current.style.width = '80vw';
        chatWindowRef.current.style.height = '80vh';
        chatWindowRef.current.style.maxWidth = '1200px';
        chatWindowRef.current.style.maxHeight = '800px';
      } else {
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
          <span className="pulse-dot"></span>
        </button>
      ) : (
        <div
          className={`chatbot-window ${isExpanded ? 'expanded' : ''}`}
          ref={chatWindowRef}
        >
          <div className="chatbot-header">
            <div className="chatbot-title">
              <FaRobot className="header-icon" />
              <h3>Huánuco - Tu Pata Turístico</h3>
            </div>
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
                {msg.text && msg.text.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
                
                {msg.options && (
                  <div className="options-container">
                    {msg.options.map((option, i) => (
                      <button
                        key={i}
                        className="option-button"
                        onClick={() => handleOptionClick(option)}
                      >
                        {option.text} {option.map && <FaMapMarkerAlt className="option-icon" />}
                      </button>
                    ))}
                  </div>
                )}
                
                {msg.quickReplies && (
                  <div className="quick-replies">
                    {msg.quickReplies.map((qr, i) => (
                      <button
                        key={i}
                        className="quick-reply"
                        onClick={() => handleQuickQuestion(qr.text)}
                      >
                        {qr.icon && <span className="quick-reply-icon">{qr.icon}</span>}
                        {qr.text}
                      </button>
                    ))}
                  </div>
                )}
                
                {msg.hotels && (
                  <div className="hotels-container">
                    <h4>Hoteles económicos:</h4>
                    {msg.hotels.map((hotel, i) => (
                      <div key={i} className="hotel-card">
                        <h5>{hotel.name}</h5>
                        <p>Precio: {hotel.price} por noche</p>
                        <p>Calificación: {hotel.rating} ★</p>
                        <p>Ubicación: {hotel.location}</p>
                      </div>
                    ))}
                  </div>
                )}
                
                {msg.restaurants && (
                  <div className="restaurants-container">
                    <h4>Restaurantes recomendados:</h4>
                    {msg.restaurants.map((rest, i) => (
                      <div key={i} className="restaurant-card">
                        <h5>{rest.name}</h5>
                        <p>Especialidad: {rest.specialty}</p>
                        <p>Calificación: {rest.rating} ★</p>
                      </div>
                    ))}
                  </div>
                )}
                
                {msg.events && (
                  <div className="events-container">
                    <h4>Próximos eventos:</h4>
                    {msg.events.map((event, i) => (
                      <div key={i} className="event-card">
                        <h5>{event.name}</h5>
                        <p>Fecha: {event.date}</p>
                        <p>Lugar: {event.location}</p>
                      </div>
                    ))}
                  </div>
                )}
                
                {msg.showMap && (
                  <div className="mini-map-container">
                    <div ref={mapRef} className="mini-map" />
                  </div>
                )}
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
              disabled={!inputValue.trim() || isTyping}
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