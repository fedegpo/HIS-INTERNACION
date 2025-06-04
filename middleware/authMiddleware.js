exports.estaAutenticado = (req, res, next) => {
  if (req.session && req.session.usuarioId) {
    return next();
  } else {
    res.redirect('/login');
  }
};

