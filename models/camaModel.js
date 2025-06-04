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
    disponible: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    higienizada: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },{
    sequelize,
    modelName: "Cama",
    tableName: "camas",
  }
)

module.exports = Cama;
