const Paciente = require('./pacienteModel');
const Usuario = require('./usuarioModel');
const Admision = require('./admisionModel');
const Cama = require('./camaModel');
const Habitacion = require('./habitacionModel');
const Ala = require('./alaModel');

Ala.hasMany(Habitacion, { foreignKey: 'alaId', as: 'habitaciones' });
Habitacion.belongsTo(Ala, { foreignKey: 'alaId', as: 'ala' });

Habitacion.hasMany(Cama, { foreignKey: 'habitacionId', as: 'camas' });
Cama.belongsTo(Habitacion, { foreignKey: 'habitacionId', as: 'habitacion' });

Admision.belongsTo(Cama, { foreignKey: 'camaId', as: 'camaAsignada', allowNull: true });
Cama.hasOne(Admision, { foreignKey: 'camaId', as: 'admisionActual', allowNull: true });

const db = {
  sequelize,
  Sequelize: require('sequelize'),
  Paciente,
  Usuario,
  Admision,
  Ala,
  Habitacion,
  Cama,
};

module.exports = db;
