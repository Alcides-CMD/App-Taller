import React, { useState } from 'react';
import './StockPage.css';

const StockPage = () => {
  // Datos de prueba para partes (después los conectaremos a la BD)
  const [partes, setPartes] = useState([
    {
      id: 1,
      idParte: 'LCD-001',
      nombre: 'Pantalla LCD iPhone 12',
      ubicacion: 'Estante A1',
      cantidad: 15,
      precio: 25000
    },
    {
      id: 2,
      idParte: 'BAT-002',
      nombre: 'Batería Samsung Galaxy S21',
      ubicacion: 'Estante B2',
      cantidad: 8,
      precio: 12000
    },
    {
      id: 3,
      idParte: 'CHG-003',
      nombre: 'Puerto de carga iPhone',
      ubicacion: 'Cajón C1',
      cantidad: 25,
      precio: 8000
    },
    {
      id: 4,
      idParte: 'RAM-004',
      nombre: 'Memoria RAM 8GB DDR4',
      ubicacion: 'Estante D3',
      cantidad: 3,
      precio: 45000
    },
    {
      id: 5,
      idParte: 'SSD-005',
      nombre: 'Disco SSD 256GB',
      ubicacion: 'Estante D4',
      cantidad: 0,
      precio: 35000
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingParte, setEditingParte] = useState(null);
  
  // Estado para nueva parte o edición
  const [formData, setFormData] = useState({
    idParte: '',
    nombre: '',
    ubicacion: '',
    cantidad: '',
    precio: ''
  });

  // Filtrar partes por búsqueda
  const partesFiltradas = partes.filter(parte => 
    parte.idParte.toLowerCase().includes(searchTerm.toLowerCase()) ||
    parte.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    parte.ubicacion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddParte = (e) => {
    e.preventDefault();
    
    // Verificar si la parte ya existe (por ID)
    const parteExistente = partes.find(p => p.idParte === formData.idParte);
    
    if (parteExistente && !editingParte) {
      // Si existe y no estamos editando, agregar a la cantidad
      const nuevasCantidad = parseInt(parteExistente.cantidad) + parseInt(formData.cantidad);
      setPartes(partes.map(p => 
        p.idParte === formData.idParte 
          ? { ...p, cantidad: nuevasCantidad }
          : p
      ));
      alert(`Se agregaron ${formData.cantidad} unidades. Total: ${nuevasCantidad}`);
    } else if (editingParte) {
      // Editar parte existente
      setPartes(partes.map(p => 
        p.id === editingParte.id 
          ? { ...p, ...formData, cantidad: parseInt(formData.cantidad), precio: parseFloat(formData.precio) }
          : p
      ));
    } else {
      // Agregar nueva parte
      const newId = Math.max(...partes.map(p => p.id)) + 1;
      setPartes([...partes, { 
        ...formData, 
        id: newId,
        cantidad: parseInt(formData.cantidad),
        precio: parseFloat(formData.precio)
      }]);
    }
    
    // Limpiar formulario
    setFormData({
      idParte: '',
      nombre: '',
      ubicacion: '',
      cantidad: '',
      precio: ''
    });
    setShowAddForm(false);
    setEditingParte(null);
  };

  const handleEditParte = (parte) => {
    setFormData({
      idParte: parte.idParte,
      nombre: parte.nombre,
      ubicacion: parte.ubicacion,
      cantidad: parte.cantidad.toString(),
      precio: parte.precio.toString()
    });
    setEditingParte(parte);
    setShowAddForm(true);
  };

  const handleDeleteParte = (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta parte?')) {
      setPartes(partes.filter(p => p.id !== id));
    }
  };

  const closeModal = () => {
    setShowAddForm(false);
    setEditingParte(null);
    setFormData({
      idParte: '',
      nombre: '',
      ubicacion: '',
      cantidad: '',
      precio: ''
    });
  };

  return (
    <div className="stock-page">
      <div className="page-header">
        <h1>Gestión de Stock</h1>
        <button 
          className="btn-primary"
          onClick={() => setShowAddForm(true)}
        >
          + Agregar Parte
        </button>
      </div>

      {/* Búsqueda */}
      <div className="search-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Buscar por ID, nombre o ubicación..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total de Partes</h3>
          <div className="stat-number">{partes.length}</div>
        </div>
        <div className="stat-card">
          <h3>Sin Stock</h3>
          <div className="stat-number danger">{partes.filter(p => p.cantidad === 0).length}</div>
        </div>
        <div className="stat-card">
          <h3>Stock Bajo (&lt;5)</h3>
          <div className="stat-number warning">{partes.filter(p => p.cantidad > 0 && p.cantidad < 5).length}</div>
        </div>
        <div className="stat-card">
          <h3>Con Stock</h3>
          <div className="stat-number success">{partes.filter(p => p.cantidad >= 5).length}</div>
        </div>
      </div>

      {/* Tabla de partes */}
      <div className="partes-table-container">
        <table className="partes-table">
          <thead>
            <tr>
              <th>ID Parte</th>
              <th>Nombre</th>
              <th>Ubicación</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {partesFiltradas.map(parte => (
              <tr key={parte.id} className={parte.cantidad === 0 ? 'sin-stock' : ''}>
                <td className="id-parte">{parte.idParte}</td>
                <td className="nombre-parte">{parte.nombre}</td>
                <td>{parte.ubicacion}</td>
                <td>
                  <span className={`cantidad-badge ${
                    parte.cantidad === 0 ? 'sin-stock' : 
                    parte.cantidad < 5 ? 'stock-bajo' : 'con-stock'
                  }`}>
                    {parte.cantidad}
                  </span>
                </td>
                <td className="precio">${parte.precio.toLocaleString()}</td>
                <td>
                  <span className={`estado-badge ${
                    parte.cantidad === 0 ? 'agotado' : 
                    parte.cantidad < 5 ? 'bajo' : 'disponible'
                  }`}>
                    {parte.cantidad === 0 ? 'Agotado' : 
                     parte.cantidad < 5 ? 'Stock Bajo' : 'Disponible'}
                  </span>
                </td>
                <td className="acciones">
                  <button 
                    className="btn-edit"
                    onClick={() => handleEditParte(parte)}
                  >
                    ✏️
                  </button>
                  <button 
                    className="btn-delete"
                    onClick={() => handleDeleteParte(parte.id)}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal para agregar/editar parte */}
      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{editingParte ? 'Editar Parte' : 'Agregar Nueva Parte'}</h2>
              <button className="close-btn" onClick={closeModal}>×</button>
            </div>
            <form onSubmit={handleAddParte}>
              <div className="form-content">
                <div className="form-grid">
                  <div className="form-group">
                    <label>ID de Parte:</label>
                    <input
                      type="text"
                      value={formData.idParte}
                      onChange={(e) => setFormData({...formData, idParte: e.target.value})}
                      required
                      placeholder="Ej: LCD-001"
                    />
                  </div>
                  <div className="form-group">
                    <label>Ubicación:</label>
                    <input
                      type="text"
                      value={formData.ubicacion}
                      onChange={(e) => setFormData({...formData, ubicacion: e.target.value})}
                      required
                      placeholder="Ej: Estante A1"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Nombre de la Parte:</label>
                  <input
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                    required
                    placeholder="Ej: Pantalla LCD iPhone 12"
                  />
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Cantidad:</label>
                    <input
                      type="number"
                      value={formData.cantidad}
                      onChange={(e) => setFormData({...formData, cantidad: e.target.value})}
                      required
                      min="0"
                    />
                  </div>
                  <div className="form-group">
                    <label>Precio:</label>
                    <input
                      type="number"
                      value={formData.precio}
                      onChange={(e) => setFormData({...formData, precio: e.target.value})}
                      required
                      step="0.01"
                      min="0"
                    />
                  </div>
                </div>
                {!editingParte && (
                  <div className="info-note">
                    <strong>Nota:</strong> Si el ID de parte ya existe, se agregará a la cantidad existente.
                  </div>
                )}
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={closeModal}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  {editingParte ? 'Actualizar' : 'Agregar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockPage;