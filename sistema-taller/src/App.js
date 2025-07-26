import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import Layout from './components/Layout/Layout';
import TecnicosPage from './pages/TecnicosPage';
import StockPage from './pages/StockPage';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="App">
        {!isAuthenticated ? (
          <Login setUser={setUser} setIsAuthenticated={setIsAuthenticated} />
        ) : (
          <Layout user={user}>
            <Routes>
              <Route path="/tecnicos" element={<TecnicosPage />} />
              <Route path="/stock" element={<StockPage />} />
              <Route path="/" element={<Navigate to="/tecnicos" />} />
            </Routes>
          </Layout>
        )}
      </div>
    </Router>
  );
}

export default App;
