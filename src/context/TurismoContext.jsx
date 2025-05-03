import React, { createContext, useState, useCallback } from 'react';

// Datos de ejemplo para el contexto
const lugaresData = [
  {
    id: 1,
    nombre: 'Kotosh - Templo de las Manos Cruzadas',
    descripcion: 'Sitio arqueológico preincaico famoso por su templo con relieves de manos cruzadas.',
    imagen: '/images/kotosh.jpg',
    ubicacion: 'A 5 km de la ciudad de Huánuco',
    categoria: 'arqueológico',
    destacado: true
  },
  {
    id: 2,
    nombre: 'Tingo María - Parque Nacional',
    descripcion: 'Hermoso parque nacional conocido por la "Bella Durmiente" y sus cuevas de Lechuzas.',
    imagen: '/images/tingo-maria.jpg',
    ubicacion: 'Tingo María, Huánuco',
    categoria: 'naturaleza',
    destacado: true
  },
  {
    id: 3,
    nombre: 'Huánuco Pampa',
    descripcion: 'Impresionante ciudad inca que funcionaba como centro administrativo.',
    imagen: '/images/huanuco-pampa.jpg',
    ubicacion: 'Provincia de Dos de Mayo',
    categoria: 'arqueológico',
    destacado: false
  },
  {
    id: 4,
    nombre: 'Laguna de los Milagros',
    descripcion: 'Hermosa laguna rodeada de vegetación exuberante y diversidad de aves.',
    imagen: '/images/laguna-milagros.jpg',
    ubicacion: 'Provincia de Leoncio Prado',
    categoria: 'naturaleza',
    destacado: true
  }
];

const eventosData = [
  {
    id: 1,
    nombre: 'Festival de la Danza de los Negritos',
    descripcion: 'Tradicional danza que representa la época colonial y la esclavitud.',
    imagen: '/images/danza-negritos.jpg',
    fecha: '26 de diciembre',
    lugar: 'Plaza de Armas de Huánuco',
    categoria: 'cultural',
    destacado: true
  },
  {
    id: 2,
    nombre: 'Carnaval Huanuqueño',
    descripcion: 'Colorida celebración con danzas, música y el tradicional cortamonte.',
    imagen: '/images/carnaval.jpg',
    fecha: 'Febrero',
    lugar: 'Diversas localidades de Huánuco',
    categoria: 'festival',
    destacado: true
  },
  {
    id: 3,
    nombre: 'Semana Turística de Huánuco',
    descripcion: 'Semana llena de actividades culturales, gastronómicas y artísticas.',
    imagen: '/images/semana-turistica.jpg',
    fecha: 'Agosto',
    lugar: 'Ciudad de Huánuco',
    categoria: 'turístico',
    destacado: false
  }
];

const equipoData = [
  {
    id: 1,
    nombre: 'Carlos Mendoza',
    cargo: 'Director de Turismo',
    bio: 'Especialista en desarrollo turístico sostenible con más de 15 años de experiencia.',
    imagen: '/images/team/carlos.jpg',
    redes: {
      linkedin: 'https://linkedin.com/in/carlosmendoza',
      twitter: 'https://twitter.com/carlosmendoza'
    }
  },
  {
    id: 2,
    nombre: 'María Sánchez',
    cargo: 'Coordinadora de Eventos',
    bio: 'Experta en gestión de eventos culturales y promoción del patrimonio local.',
    imagen: '/images/team/maria.jpg',
    redes: {
      linkedin: 'https://linkedin.com/in/mariasanchez',
      instagram: 'https://instagram.com/mariasanchez'
    }
  },
  {
    id: 3,
    nombre: 'Jorge Ramírez',
    cargo: 'Guía Turístico Senior',
    bio: 'Conocedor de la historia y geografía de Huánuco, con certificación internacional.',
    imagen: '/images/team/jorge.jpg',
    redes: {
      facebook: 'https://facebook.com/jorgeramirez',
      instagram: 'https://instagram.com/jorgeramirez'
    }
  }
];

const testimoniosData = [
  {
    id: 1,
    nombre: 'Ana García',
    origen: 'Lima, Perú',
    texto: 'Mi visita a Huánuco fue increíble. Los paisajes son espectaculares y la gente muy amable. Definitivamente volveré.',
    rating: 5,
    imagen: '/images/testimonials/ana.jpg'
  },
  {
    id: 2,
    nombre: 'John Smith',
    origen: 'California, USA',
    texto: 'Kotosh es un sitio arqueológico impresionante. Los guías locales conocen muy bien la historia y hacen la experiencia única.',
    rating: 4,
    imagen: '/images/testimonials/john.jpg'
  },
  {
    id: 3,
    nombre: 'Luisa Fernández',
    origen: 'Arequipa, Perú',
    texto: 'El Parque Nacional de Tingo María es un paraíso natural. Las cuevas de Lechuzas son fascinantes.',
    rating: 5,
    imagen: '/images/testimonials/luisa.jpg'
  }
];

// Crear el contexto
export const TurismoContext = createContext();

// Proveedor del contexto
export const TurismoProvider = ({ children }) => {
  const [lugares, setLugares] = useState(lugaresData);
  const [eventos, setEventos] = useState(eventosData);
  const [equipo, setEquipo] = useState(equipoData);
  const [testimonios, setTestimonios] = useState(testimoniosData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para cargar datos (simulada)
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulación de carga de datos desde una API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // En un caso real, aquí se haría la llamada a la API
      // const response = await axios.get('https://api.turismo-huanuco.com/data');
      // setLugares(response.data.lugares);
      // setEventos(response.data.eventos);
      // setEquipo(response.data.equipo);
      // setTestimonios(response.data.testimonios);
      
    } catch (err) {
      console.error('Error al cargar datos:', err);
      setError('Hubo un problema al cargar los datos. Por favor, intenta de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Valores que se proporcionarán a través del contexto
  const contextValue = {
    lugares,
    eventos,
    equipo,
    testimonios,
    loading,
    error,
    fetchData
  };

  return (
    <TurismoContext.Provider value={contextValue}>
      {children}
    </TurismoContext.Provider>
  );
};

export default TurismoProvider;
