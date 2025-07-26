import React, { useState } from 'react';
import './Login.css';

const Login = ({ setUser, setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Usuarios de prueba (después los conectaremos a la BD)
  const testUsers = {
    'admin': { password: '123', role: 'admin', name: 'Administrador' },
    'tecnico1': { password: '123', role: 'tecnico', name: 'Juan Pérez' },
    'stock1': { password: '123', role: 'stock', name: 'María García' }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (testUsers[username] && testUsers[username].password === password) {
      const userData = {
        username,
        role: testUsers[username].role,
        name: testUsers[username].name
      };
      setUser(userData);
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Sistema de Taller</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Usuario:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="login-btn">Iniciar Sesión</button>
        </form>
        <div className="test-users">
          <p><strong>Usuarios de prueba:</strong></p>
          <p>admin / 123 (Administrador)</p>
          <p>tecnico1 / 123 (Técnico)</p>
          <p>stock1 / 123 (Stock)</p>
        </div>
      </div>
    </div>
  );
};

export default Login;