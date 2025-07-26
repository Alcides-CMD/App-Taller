import React, { useState } from 'react';
import './TecnicosPage.css';
import DetalleEquipo from '../components/Tecnicos/DetalleEquipo';

const TecnicosPage = () => {
  // Datos de prueba (después los conectaremos a la BD)
  const [equipos, setEquipos] = useState([
  {
    id: 1,
    orden: 'ORD-001',
    cliente: 'Juan Pérez',
    celularCliente: '+54 11 1234-5678',
    equipo: 'iPhone 12 Pro',
    modelo: 'A2341',
    problema: 'Pantalla rota y no responde al tacto',
    estado: 'Diagnosticado',
    tecnico: 'Carlos López',
    usuarioTecnico: 'carlos.lopez',
    fechaIngreso: '2025-01-15',
    partes: ['Pantalla LCD iPhone 12', 'Digitalizador'],
    comentarios: [
      {
        fecha: '2025-01-15 10:30',
        usuario: 'carlos.lopez',
        comentario: 'Equipo recibido, evaluando daños en pantalla'
      },
      {
        fecha: '2025-01-15 14:20',
        usuario: 'carlos.lopez',
        comentario: 'Confirmo que necesita cambio de pantalla completa y digitalizador'
      }
    ]
  },
  {
    id: 2,
    orden: 'ORD-002',
    cliente: 'María García',
    celularCliente: '+54 11 9876-5432',
    equipo: 'Samsung Galaxy S21',
    modelo: 'SM-G991B',
    problema: 'No carga la batería',
    estado: 'En espera',
    tecnico: 'Ana Torres',
    usuarioTecnico: 'ana.torres',
    fechaIngreso: '2025-01-16',
    partes: ['Puerto de carga Samsung S21'],
    comentarios: [
      {
        fecha: '2025-01-16 09:15',
        usuario: 'ana.torres',
        comentario: 'Revisando puerto de carga y cable'
      }
    ]
  },
  {
    id: 3,
    orden: 'ORD-003',
    cliente: 'Pedro Martínez',
    celularCliente: '+54 11 5555-1234',
    equipo: 'Laptop HP Pavilion',
    modelo: '15-eg0001la',
    problema: 'Pantalla azul frecuente',
    estado: 'Asignado',
    tecnico: 'Carlos López',
    usuarioTecnico: 'carlos.lopez',
    fechaIngreso: '2025-01-17',
    partes: ['Memoria RAM 8GB DDR4'],
    comentarios: [
      {
        fecha: '2025-01-17 11:00',
        usuario: 'carlos.lopez',
        comentario: 'Iniciando diagnóstico de memoria RAM'
      }
    ]
  }
]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [equipoSeleccionado, setEquipoSeleccionado] = useState(null);
  const [showDetalle, setShowDetalle] = useState(false);
  
  
  // Estado para nuevo equipo
  const [nuevoEquipo, setNuevoEquipo] = useState({
    orden: '',
    cliente: '',
    equipo: '',
    problema: '',
    estado: 'Ingresado',
    tecnico: '',
    fechaIngreso: new Date().toISOString().split('T')[0]
  });

  // Filtrar equipos
  const equiposFiltrados = equipos.filter(equipo => {
    const matchSearch = equipo.orden.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       equipo.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       equipo.equipo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchEstado = filterEstado === '' || equipo.estado === filterEstado;
    return matchSearch && matchEstado;
  });

  const handleAddEquipo = (e) => {
    e.preventDefault();
    const newId = Math.max(...equipos.map(e => e.id)) + 1;
    setEquipos([...equipos, { ...nuevoEquipo, id: newId }]);
    setNuevoEquipo({
      orden: '',
      cliente: '',
      equipo: '',
      problema: '',
      estado: 'Ingresado',
      tecnico: '',
      fechaIngreso: new Date().toISOString().split('T')[0]
    });
    setShowAddForm(false);
  };

  const handleVerDetalle = (equipo) => {
  setEquipoSeleccionado(equipo);
  setShowDetalle(true);
};

const handleCloseDetalle = () => {
  setShowDetalle(false);
  setEquipoSeleccionado(null);
};

const handleUpdateEquipo = (equipoActualizado) => {
  setEquipos(equipos.map(e => 
    e.id === equipoActualizado.id ? equipoActualizado : e
  ));
};

  const estados = ['Ingresado', 'Diagnosticado', 'Asignado', 'En espera', 'Rechazado','Entregado'];

  return (
    <div className="tecnicos-page">
      <div className="page-header">
        <h1>Gestión de Equipos</h1>
        <button 
          className="btn-primary"
          onClick={() => setShowAddForm(true)}
        >
          + Agregar Equipo
        </button>
      </div>

      {/* Filtros y búsqueda */}
      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Buscar por orden, cliente o equipo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-box">
          <select
            value={filterEstado}
            onChange={(e) => setFilterEstado(e.target.value)}
            className="filter-select"
          >
            <option value="">Todos los estados</option>
            {estados.map(estado => (
              <option key={estado} value={estado}>{estado}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Lista de equipos */}
      <div className="equipos-grid">
        {equiposFiltrados.map(equipo => (
          <div key={equipo.id} className="equipo-card">
            <div className="card-header">
              <span className="orden-number">{equipo.orden}</span>
              <span className={`estado-badge ${equipo.estado.replace(/\s+/g, '-').toLowerCase()}`}>
                {equipo.estado}
              </span>
            </div>
            <div className="card-body">
              <h3>{equipo.cliente}</h3>
              <p><strong>Equipo:</strong> {equipo.equipo}</p>
              <p><strong>Problema:</strong> {equipo.problema}</p>
              <p><strong>Técnico:</strong> {equipo.tecnico}</p>
              <p><strong>Fecha:</strong> {equipo.fechaIngreso}</p>
            </div>
            <div className="card-actions">
              <button className="btn-secondary"
                      onClick={() => handleVerDetalle(equipo)}>Ver Detalles</button>
              <button className="btn-primary">Pedir Partes</button>
            </div>
          </div>
        ))}
      </div>

       {/* Modal de detalle */}
      {showDetalle && equipoSeleccionado && (
        <DetalleEquipo
          equipo={equipoSeleccionado}
          onClose={handleCloseDetalle}
          onUpdateEquipo={handleUpdateEquipo}
        />
      )}

      {/* Modal para agregar equipo */}
      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Agregar Nuevo Equipo</h2>
              <button 
                className="close-btn"
                onClick={() => setShowAddForm(false)}
              >
             
                ×
              </button>
            </div>
            <form onSubmit={handleAddEquipo}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Número de Orden:</label>
                  <input
                    type="text"
                    value={nuevoEquipo.orden}
                    onChange={(e) => setNuevoEquipo({...nuevoEquipo, orden: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Cliente:</label>
                  <input
                    type="text"
                    value={nuevoEquipo.cliente}
                    onChange={(e) => setNuevoEquipo({...nuevoEquipo, cliente: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Equipo:</label>
                  <input
                    type="text"
                    value={nuevoEquipo.equipo}
                    onChange={(e) => setNuevoEquipo({...nuevoEquipo, equipo: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Técnico Asignado:</label>
                  <input
                    type="text"
                    value={nuevoEquipo.tecnico}
                    onChange={(e) => setNuevoEquipo({...nuevoEquipo, tecnico: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Problema Reportado:</label>
                <textarea
                  value={nuevoEquipo.problema}
                  onChange={(e) => setNuevoEquipo({...nuevoEquipo, problema: e.target.value})}
                  rows="3"
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowAddForm(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  Agregar Equipo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TecnicosPage;