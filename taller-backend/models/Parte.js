module.exports = (sequelize, DataTypes) => {
  const Parte = sequelize.define('Parte', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    idParte: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ubicacion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    categoria: {
      type: DataTypes.STRING
    },
    proveedor: {
      type: DataTypes.STRING
    },
    stockMinimo: {
      type: DataTypes.INTEGER,
      defaultValue: 5
    }
  }, {
    tableName: 'partes',
    timestamps: true
  });

  return Parte;
};
