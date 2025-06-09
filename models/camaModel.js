const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

class Cama extends Model { }

Cama.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  codigo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  estado: {
    type: DataTypes.ENUM('Libre', 'Ocupada', 'En Limpieza', 'En Mantenimiento'),
    allowNull: false,
    defaultValue: 'Libre'
  },
  habitacionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'habitaciones',
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: "Cama",
  tableName: "camas",
  timestamps: true
});

module.exports = Cama;
