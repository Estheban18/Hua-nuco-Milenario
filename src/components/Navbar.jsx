import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaSearch, FaUser } from 'react-icons/fa';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const navLinks = [
  { name: 'Inicio', path: '/' },
  { name: 'Nosotros', path: '/nosotros' },
  { name: 'Blog', path: '/blog' },
  { name: 'Paquetes Turísticos', path: '/paquetes' },
  { name: 'Contacto', path: '/contacto' },
  { name: 'Login', path: '/login', icon: <FaUser /> }
];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Cerrar el menú móvil cuando cambia la ruta
    setIsOpen(false);
    setSearchOpen(false);
  }, [location]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Redirigir a la página de búsqueda con el query
      window.location.href = `/busqueda?q=${encodeURIComponent(searchQuery)}`;
      setSearchQuery('');
      setSearchOpen(false);
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="/logo.svg" alt="Turismo Huánuco" />
        </Link>

        <div className="navbar-icons">
          <button
            className="search-icon"
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Buscar"
          >
            <FaSearch />
          </button>

          <button
            className="menu-icon"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <div className={`search-container ${searchOpen ? 'active' : ''}`}>
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Buscar lugares, eventos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">
              <FaSearch />
            </button>
          </form>
        </div>

        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          {navLinks.map((link, index) => (
            <li key={index} className="nav-item">
              <Link
                to={link.path}
                className={location.pathname === link.path ? 'nav-link active' : 'nav-link'}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
