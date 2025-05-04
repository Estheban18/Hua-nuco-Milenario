import React, { createContext, useState, useCallback } from 'react';

// Datos de ejemplo para el contexto
const lugaresData = [
  {
    id: 1,
    nombre: 'Kotosh - Templo de las Manos Cruzadas',
    descripcion: 'Sitio arqueológico preincaico famoso por su templo con relieves de manos cruzadas.',
    imagen: 'descarga-_8_.jpg',
    ubicacion: 'A 5 km de la ciudad de Huánuco',
    categoria: 'arqueológico',
    destacado: true
  },
  {
    id: 2,
    nombre: 'Tingo María - Parque Nacional',
    descripcion: 'Hermoso parque nacional conocido por la "Bella Durmiente" y sus cuevas de Lechuzas.',
    imagen: 'images-_2_.jpg',
    ubicacion: 'Tingo María, Huánuco',
    categoria: 'naturaleza',
    destacado: true
  },
  {
    id: 3,
    nombre: 'Huánuco Pampa',
    descripcion: 'Impresionante ciudad inca que funcionaba como centro administrativo.',
    imagen: 'huanuco-pampa-monumental-archaeological-zone-556.png',
    ubicacion: 'Provincia de Dos de Mayo',
    categoria: 'arqueológico',
    destacado: false
  },
  {
    id: 4,
    nombre: 'Laguna de los Milagros',
    descripcion: 'Hermosa laguna rodeada de vegetación exuberante y diversidad de aves.',
    imagen: 'un-dia-de-relax-hermoso.jpg',
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
    imagen: 'principal-Festividad-de-los-Negritos-de-Huánuco.webp',
    fecha: '26 de diciembre',
    lugar: 'Plaza de Armas de Huánuco',
    categoria: 'cultural',
    destacado: true
  },
  {
    id: 2,
    nombre: 'Carnaval Huanuqueño',
    descripcion: 'Colorida celebración con danzas, música y el tradicional cortamonte.',
    imagen: 'images (3).jpeg',
    fecha: 'Febrero',
    lugar: 'Diversas localidades de Huánuco',
    categoria: 'festival',
    destacado: true
  },
  {
    id: 3,
    nombre: 'Semana Turística de Huánuco',
   
    imagen: 'images (4).jpeg',
    fecha: 'Agosto',
    lugar: 'Ciudad de Huánuco',
    categoria: 'turístico',
    destacado: false
  }
];

const equipoData = [
  {
    id: 1,
    nombre: 'Makanaky la realeza',
    
  
    imagen: 'images (1).jpeg',
    redes: {
      
    }
  },
  {
    id: 2,
    nombre: 'Faraon Love Shaydi',
    cargo: 'Coordinadora de Eventos',
    bio: 'Experta en gestión de eventos culturales y promoción del patrimonio local.',
    imagen: 'images (1).jpeg',
    redes: {
     

    }
  },
  {
    id: 3,
    nombre: 'Sideral Lujan Carrion',

    imagen: 'descarga (6).jpeg',
    redes: {
    

    }
  }
];

const testimoniosData = [
  {
    id: 1,
    nombre: 'Faraon Love Shaydi',
    origen: 'Lima, Perú',
    texto: 'Mi visita a Huánuco fue increíble. Los paisajes son espectaculares y la gente muy amable. Definitivamente volveré.',
    rating: 5,
    imagen: 'images (1).jpeg',
    
  },
  {
    id: 2,
    nombre: 'Makanaky  la realeza ',
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
