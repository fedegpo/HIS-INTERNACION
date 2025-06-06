const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/connection');


class Ala extends Model { }

Ala.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  piso: {
    type: DataTypes.STRING,
    allowNull: true
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'Ala',
  tableName: 'alas',
  timestamps: true
});

module.exports = Ala;
