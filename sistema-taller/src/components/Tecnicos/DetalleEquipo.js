import React, { useState } from 'react';
import './DetalleEquipo.css';

const DetalleEquipo = ({ equipo, onClose, onUpdateEquipo }) => {
  const [nuevoComentario, setNuevoComentario] = useState('');
  const [equipoEditado, setEquipoEditado] = useState({ ...equipo });

  const estados = ['Ingresado', 'Diagnosticado', 'Asignado', 'En espera', 'Rechazado', 'Entregado'];

  const handleAddComentario = (e) => {
    e.preventDefault();
    if (nuevoComentario.trim()) {
      const comentario = {
        fecha: new Date().toLocaleString('es-AR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        }),
        usuario: 'usuario.actual', // Después lo conectaremos con el usuario real
        comentario: nuevoComentario.trim()
      };

      const equipoActualizado = {
        ...equipoEditado,
        comentarios: [...equipoEditado.comentarios, comentario]
      };

      setEquipoEditado(equipoActualizado);
      onUpdateEquipo(equipoActualizado);
      setNuevoComentario('');
    }
  };

  const handleUpdateField = (field, value) => {
    const equipoActualizado = {
      ...equipoEditado,
      [field]: value
    };
    setEquipoEditado(equipoActualizado);
    onUpdateEquipo(equipoActualizado);
  };

  const handleUpdatePartes = (partes) => {
    const partesArray = partes.split(',').map(p => p.trim()).filter(p => p);
    handleUpdateField('partes', partesArray);
  };

  return (
    <div className="modal-overlay">
      <div className="detalle-modal">
        <div className="detalle-header">
          <div className="header-info">
            <h2>Detalles del Equipo</h2>
            <span className="orden-badge">{equipoEditado.orden}</span>
          </div>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="detalle-content">
          <div className="info-grid">
            {/* Información del Cliente */}
            <div className="info-section">
              <h3>📱 Información del Cliente</h3>
              <div className="info-card">
                <div className="info-item">
                  <label>Nombre del Cliente:</label>
                  <input
                    type="text"
                    value={equipoEditado.cliente}
                    onChange={(e) => handleUpdateField('cliente', e.target.value)}
                  />
                </div>
                <div className="info-item">
                  <label>Número de Celular:</label>
                  <input
                    type="text"
                    value={equipoEditado.celularCliente}
                    onChange={(e) => handleUpdateField('celularCliente', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Información del Equipo */}
            <div className="info-section">
              <h3>🔧 Información del Equipo</h3>
              <div className="info-card">
                <div className="info-item">
                  <label>Nombre/Modelo del Equipo:</label>
                  <input
                    type="text"
                    value={equipoEditado.equipo}
                    onChange={(e) => handleUpdateField('equipo', e.target.value)}
                  />
                </div>
                <div className="info-item">
                  <label>Modelo Específico:</label>
                  <input
                    type="text"
                    value={equipoEditado.modelo}
                    onChange={(e) => handleUpdateField('modelo', e.target.value)}
                  />
                </div>
                <div className="info-item">
                  <label>Número de Orden:</label>
                  <input
                    type="text"
                    value={equipoEditado.orden}
                    onChange={(e) => handleUpdateField('orden', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Información del Técnico */}
            <div className="info-section">
              <h3>👨‍🔧 Información del Técnico</h3>
              <div className="info-card">
                <div className="info-item">
                  <label>Técnico Asignado:</label>
                  <input
                    type="text"
                    value={equipoEditado.tecnico}
                    onChange={(e) => handleUpdateField('tecnico', e.target.value)}
                  />
                </div>
                <div className="info-item">
                  <label>Usuario/Técnico:</label>
                  <input
                    type="text"
                    value={equipoEditado.usuarioTecnico}
                    onChange={(e) => handleUpdateField('usuarioTecnico', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Estado y Fechas */}
            <div className="info-section">
              <h3>📊 Estado y Fechas</h3>
              <div className="info-card">
                <div className="info-item">
                  <label>Estado:</label>
                  <select
                    value={equipoEditado.estado}
                    onChange={(e) => handleUpdateField('estado', e.target.value)}
                    className="estado-select"
                  >
                    {estados.map(estado => (
                      <option key={estado} value={estado}>{estado}</option>
                    ))}
                  </select>
                </div>
                <div className="info-item">
                  <label>Fecha de Ingreso:</label>
                  <input
                    type="date"
                    value={equipoEditado.fechaIngreso}
                    onChange={(e) => handleUpdateField('fechaIngreso', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Problema */}
          <div className="problema-section">
            <h3>🔍 Problema Reportado</h3>
            <div className="info-card">
              <textarea
                value={equipoEditado.problema}
                onChange={(e) => handleUpdateField('problema', e.target.value)}
                rows="3"
                placeholder="Describe el problema del equipo..."
              />
            </div>
          </div>

          {/* Partes */}
          <div className="partes-section">
            <h3>🔩 Partes Necesarias</h3>
            <div className="info-card">
              <div className="partes-input">
                <label>Partes (separadas por coma):</label>
                <input
                  type="text"
                  value={equipoEditado.partes ? equipoEditado.partes.join(', ') : ''}
                  onChange={(e) => handleUpdatePartes(e.target.value)}
                  placeholder="Ej: Pantalla LCD, Batería, Puerto de carga"
                />
              </div>
              <div className="partes-list">
                {equipoEditado.partes && equipoEditado.partes.map((parte, index) => (
                  <span key={index} className="parte-tag">
                    {parte}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Comentarios */}
          <div className="comentarios-section">
            <h3>💬 Comentarios y Seguimiento</h3>
            
            {/* Lista de comentarios existentes */}
            <div className="comentarios-list">
              {equipoEditado.comentarios && equipoEditado.comentarios.map((comentario, index) => (
                <div key={index} className="comentario-item">
                  <div className="comentario-header">
                    <span className="comentario-usuario">{comentario.usuario}</span>
                    <span className="comentario-fecha">{comentario.fecha}</span>
                  </div>
                  <div className="comentario-texto">
                    {comentario.comentario}
                  </div>
                </div>
              ))}
            </div>

            {/* Agregar nuevo comentario */}
            <form onSubmit={handleAddComentario} className="nuevo-comentario">
              <div className="comentario-input-group">
                <textarea
                  value={nuevoComentario}
                  onChange={(e) => setNuevoComentario(e.target.value)}
                  placeholder="Agregar comentario o actualización..."
                  rows="3"
                />
                <button type="submit" className="btn-comentario">
                  Agregar Comentario
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="detalle-actions">
          <button className="btn-secondary" onClick={onClose}>
            Cerrar
          </button>
          <button className="btn-primary">
            Pedir Partes
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetalleEquipo;
