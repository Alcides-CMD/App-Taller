module.exports = (sequelize, DataTypes) => {
  const EquipoParte = sequelize.define('EquipoParte', {
    equipoId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'equipos',
        key: 'id'
      }
    },
    parteId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'partes',
        key: 'id'
      }
    },
    cantidad: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    estado: {
      type: DataTypes.ENUM('solicitada', 'en_stock', 'instalada'),
      defaultValue: 'solicitada'
    }
  }, {
    tableName: 'equipo_partes',
    timestamps: true
  });

  return EquipoParte;
};