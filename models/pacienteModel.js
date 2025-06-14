const { Model, DataTypes } = require("sequelize");
const sequelize = require('../db/connection');

class Paciente extends Model { }

Paciente.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombrePaciente: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellidoPaciente: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dni: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    genero: {
      type: DataTypes.ENUM("M", "F", "Otro"),
      allowNull: false,
    },
    fechaNacimientoPaciente: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    numeroCelular: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tipoAdmision: {
      type: DataTypes.ENUM('PROGRAMADO', 'EMERGENCIA'),
      allowNull: false,
      defaultValue: 'PROGRAMADO'
    }
  }, {
  sequelize,
  modelName: "Paciente",
  tableName: "pacientes",
}
);

module.exports = Paciente;

