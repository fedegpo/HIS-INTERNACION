const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/connection');
const bcrypt = require('bcryptjs');

class Usuario extends Model {
  async validarContraseña(contraseñaPlana) {
    return await bcrypt.compare(contraseñaPlana, this.contraseña);
  }
}

Usuario.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombreUsuario: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: {
        msg: "El nombre de usuario no puede estar vacio"
      }
    }
  },
  contraseña: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "La contraseña no puede estar vacia"
      }
    }
  },
  rol: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'administrador',
  }
}, {
  sequelize,
  modelName: 'Usuario',
  tableName: 'usuarios',
  timestamps: true,
  hooks: {
    beforeSave: async (usuario) => {
      if (usuario.changed('contraseña')) {
        const salt = await bcrypt.genSalt(10);
        usuario.contraseña = await bcrypt.hash(usuario.contraseña, salt);
      }
    }
  }
});

module.exports = Usuario;
