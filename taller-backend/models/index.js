const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    timezone: '-03:00' // Para Argentina
  }
);

// Importar modelos
const Usuario = require('./Usuario')(sequelize, Sequelize.DataTypes);
const Equipo = require('./Equipo')(sequelize, Sequelize.DataTypes);
const Parte = require('./Parte')(sequelize, Sequelize.DataTypes);
const Comentario = require('./Comentario')(sequelize, Sequelize.DataTypes);
const EquipoParte = require('./EquipoParte')(sequelize, Sequelize.DataTypes);

// Definir asociaciones
Usuario.hasMany(Equipo, { foreignKey: 'tecnicoId', as: 'equipos' });
Equipo.belongsTo(Usuario, { foreignKey: 'tecnicoId', as: 'tecnico' });

Equipo.hasMany(Comentario, { foreignKey: 'equipoId', as: 'comentarios' });
Comentario.belongsTo(Equipo, { foreignKey: 'equipoId' });
Comentario.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'usuario' });

Equipo.belongsToMany(Parte, { 
  through: EquipoParte, 
  foreignKey: 'equipoId',
  otherKey: 'parteId',
  as: 'partes'
});
Parte.belongsToMany(Equipo, { 
  through: EquipoParte, 
  foreignKey: 'parteId',
  otherKey: 'equipoId',
  as: 'equipos'
});

module.exports = {
  sequelize,
  Usuario,
  Equipo,
  Parte,
  Comentario,
  EquipoParte
};