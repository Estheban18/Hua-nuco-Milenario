import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFocused, setIsFocused] = useState({
    email: false,
    password: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de autenticación aquí
    console.log('Email:', email, 'Password:', password);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2 className="login-title">Iniciar Sesión</h2>
          <div className="login-underline"></div>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className={`input-group ${isFocused.email ? 'focused' : ''}`}>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setIsFocused({...isFocused, email: true})}
              onBlur={() => setIsFocused({...isFocused, email: false})}
              required
            />
            <label htmlFor="email">Correo Electrónico</label>
            <div className="input-underline"></div>
          </div>
          
          <div className={`input-group ${isFocused.password ? 'focused' : ''}`}>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setIsFocused({...isFocused, password: true})}
              onBlur={() => setIsFocused({...isFocused, password: false})}
              required
            />
            <label htmlFor="password">Contraseña</label>
            <div className="input-underline"></div>
          </div>
          
          <button type="submit" className="login-button">
            <span>Ingresar</span>
            <div className="button-overlay"></div>
          </button>
        </form>
        
        <div className="login-footer">
          <a href="#forgot" className="forgot-password">¿Olvidaste tu contraseña?</a>
          <p className="signup-text">¿No tienes cuenta? <a href="#signup">Regístrate</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;