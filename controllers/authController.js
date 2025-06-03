const Usuario = require('../models/usuarioModel');
const bcrypt = require('bcryptjs');

exports.mostrarFormularioRegistro = (req, res) => {
  res.render('registro', { title: 'Registrar Nuevo Usuario' });
};

exports.procesarRegistro = async (req, res) => {
  try {
    const { nombreUsuario, contraseña, rol } = req.body;

    const usuarioExistente = await Usuario.findOne({ where: { nombreUsuario } });
    if (usuarioExistente) {
      return res.render('registro', {
        title: 'Registrar Nuevo Usuario',
        error: 'El nombre de usuario ya está en uso. Por favor, elige otro.'
      });
    }

    await Usuario.create({
      nombreUsuario: nombreUsuario,
      contraseña: contraseña,
      rol: rol || 'admisionista'
    });

    res.redirect('/login');

  } catch (error) {
    console.error("Error al procesar el registro:", error);
    res.render('registro', {
      title: 'Registrar Nuevo Usuario',
      error: 'Ocurrió un error al intentar registrar el usuario.'
    });
  }
};

exports.mostrarFormularioLogin = (req, res) => {
  res.render('login', { title: 'Iniciar Sesión' });
};

exports.procesarLogin = async (req, res) => {
  const { nombreUsuario, contraseña } = req.body;
  try {
    const usuario = await Usuario.findOne({ where: { nombreUsuario } });

    if (!usuario) {
      return res.render('login', { title: 'Iniciar Sesión', error: 'Usuario o contraseña incorrectos.' });
    }

    const contraseñaValida = await usuario.validarContraseña(contraseña);

    if (!contraseñaValida) {
      return res.render('login', { title: 'Iniciar Sesión', error: 'Usuario o contraseña incorrectos.' });
    }

    req.session.usuarioId = usuario.id;
    req.session.nombreUsuario = usuario.nombreUsuario;
    req.session.rol = usuario.rol;

    res.redirect('/');

  } catch (error) {
    console.error("Error en el login:", error);
    res.status(500).render('login', { title: 'Iniciar Sesión', error: 'Error interno del servidor.' });
  }
};

exports.procesarLogout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error("Error al cerrar sesion:", err);
    }
    res.redirect('/login');
  });
};
