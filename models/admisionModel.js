const { Model, DataTypes } = require("sequelize");
const sequelize = require('../db/connection');

class Admision extends Model { }

Admision.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fechaDeAdmision: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    horaDeAdmision: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    motivoDeAdmision: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: "Admision",
    tableName: "admisiones",
  }
)

module.exports = Admision;
