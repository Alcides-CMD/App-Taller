module.exports = (sequelize, DataTypes) => {
  const Equipo = sequelize.define('Equipo', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    orden: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    cliente: {
      type: DataTypes.STRING,
      allowNull: false
    },
    celularCliente: {
      type: DataTypes.STRING
    },
    equipo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    modelo: {
      type: DataTypes.STRING
    },
    problema: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    estado: {
      type: DataTypes.ENUM('Ingresado', 'Diagnosticado', 'Asignado', 'En espera', 'Rechazado', 'Entregado'),
      allowNull: false,
      defaultValue: 'Ingresado'
    },
    tecnicoId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'usuarios',
        key: 'id'
      }
    },
    fechaIngreso: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    fechaEntrega: {
      type: DataTypes.DATEONLY
    },
    costoReparacion: {
      type: DataTypes.DECIMAL(10, 2)
    },
    observaciones: {
      type: DataTypes.TEXT
    }
  }, {
    tableName: 'equipos',
    timestamps: true
  });

  return Equipo;
};