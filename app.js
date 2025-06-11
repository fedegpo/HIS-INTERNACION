require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const pug = require('pug');
const app = express();
const sequelize = require('./db/connection');
const authRoutes = require('./routes/authRoutes');
const indexRouter = require('./routes/index');
const admisionRoutes = require('./routes/admisionRoutes');
const camaRoutes = require('./routes/camaRoutes');
const pacienteRoutes = require('./routes/pacienteRoutes');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use((req, res, next) => {
  if (req.session.usuarioId) {
    res.locals.usuarioLogueado = {
      id: req.session.usuarioId,
      nombreUsuario: req.session.nombreUsuario,
      rol: req.session.rol
    };
  }
  next();
});

//rutas
app.use('/', indexRouter);
app.use('/', authRoutes);
app.use('/admisiones', admisionRoutes);
app.use('/camas', camaRoutes);
app.use('/pacientes', pacienteRoutes);

// iniciar servidor
const PORT = process.env.PORT || 3000;
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Modelos sincronizados');
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error al sincronizar modelos:', err);
  });
