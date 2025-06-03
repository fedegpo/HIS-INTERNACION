const { Model, DataTypes } = require("sequelize");
const sequelize = require('./db/connection');

class Paciente extends Model { }

Paciente.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    primerNombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    segundoNombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genero: {
      type: DataTypes.ENUM("M", "F"),
      allowNull: false,
    },
    fechaDeNacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    numeroCelular: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: "Paciente",
    tableName: "pacientes",
  }
);

module.exports = Paciente;

