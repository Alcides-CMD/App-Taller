module.exports = (sequelize, DataTypes) => {
  const Comentario = sequelize.define('Comentario', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    equipoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'equipos',
        key: 'id'
      }
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'id'
      }
    },
    comentario: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'comentarios',
    timestamps: true
  });

  return Comentario;
};