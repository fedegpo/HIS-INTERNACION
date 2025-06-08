const { Model, DataTypes } = require("sequelize");
const sequelize = require('../db/connection');

class Cama extends Model { }

Cama.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    numero: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estado: {
      type: DataTypes.ENUM('Libre', 'Ocupada', 'En Limpieza', 'En Mantenimiento', 'No Disponible'),
      allowNull: false,
      defaultValue: 'Libre'
    },
    disponible: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    higienizada: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
  sequelize,
  modelName: "Cama",
  tableName: "camas",
}
)

module.exports = Cama;
