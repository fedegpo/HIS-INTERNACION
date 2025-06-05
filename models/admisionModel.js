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
    fechaHoraAdmision: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    motivoDeAdmision: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pacienteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'pacientes',
        key: 'id'
      }
    },
    tipoAdmision: {
      type: DataTypes.ENUM('Programada', 'Derivación Médica', 'Emergencia', 'Derivación Guardia'),
      allowNull: false
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'id'
      }
    },
    medicoDerivante: {
      type: DataTypes.STRING,
      allowNull: true
    },
    datosSeguroMedico: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    estadoAdmision: {
      type: DataTypes.ENUM('Activa', 'Pre-Admisión', 'Cancelada', 'Finalizada'),
      allowNull: false,
      defaultValue: 'Activa'
    },
    camaId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'camas',
        key: 'id'
      }
    },
  }, {
  sequelize,
  modelName: "Admision",
  tableName: "admisiones",
  timestamps: true,
}
)

module.exports = Admision;
