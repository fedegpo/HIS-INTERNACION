const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

class Habitacion extends Model { }

Habitacion.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  numero: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tipo: {
    type: DataTypes.ENUM('Individual', 'Doble'),
    allowNull: false
  },
}, {
  sequelize,
  modelName: 'Habitacion',
  tableName: 'habitaciones',
  timestamps: true
});

module.exports = Habitacion;
