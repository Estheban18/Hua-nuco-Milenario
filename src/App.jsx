import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Nosotros from './components/Nosotros';
import Blog from './components/Blog';
import Contacto from './components/Contacto';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import Loading from './components/Loading';
import Error404 from './components/Error404';
import { TurismoProvider } from './context/TurismoContext';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga de datos
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  const appStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    width: '100%',
    margin: 0,
    padding: 0,
    fontFamily: 'Open Sans, sans-serif',
    backgroundColor: '#f9f9f9',
    color: '#1F271B',
    position: 'relative',
    overflowX: 'hidden'
  };

  return (
    <TurismoProvider>
      <Router>
        <div style={appStyle}>
          <Navbar />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/nosotros" element={<Nosotros />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="*" element={<Error404 />} />
            </Routes>
          </AnimatePresence>
          <Chatbot />
          <Footer />
        </div>
      </Router>
    </TurismoProvider>
  );
}

export default App;
