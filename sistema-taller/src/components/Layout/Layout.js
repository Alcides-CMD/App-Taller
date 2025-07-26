import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Layout.css';

const Layout = ({ user, children }) => {
  const location = useLocation();

  const handleLogout = () => {
    window.location.reload(); // Forma simple de logout, después la mejoramos
  };

  // Control de acceso según rol
  const canAccessStock = user.role === 'admin' || user.role === 'stock';
  const canAccessTecnicos = user.role === 'admin' || user.role === 'tecnico';

  return (
    <div className="layout">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <h2>Sistema de Taller</h2>
          </div>
          <nav className="nav-menu">
            {canAccessTecnicos && (
              <Link 
                to="/tecnicos" 
                className={`nav-link ${location.pathname === '/tecnicos' ? 'active' : ''}`}
              >
                Equipos/Técnicos
              </Link>
            )}
            {canAccessStock && (
              <Link 
                to="/stock" 
                className={`nav-link ${location.pathname === '/stock' ? 'active' : ''}`}
              >
                Stock/Partes
              </Link>
            )}
          </nav>
          <div className="user-info">
            <span className="user-name">{user.name}</span>
            <span className="user-role">({user.role})</span>
            <button onClick={handleLogout} className="logout-btn">
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;