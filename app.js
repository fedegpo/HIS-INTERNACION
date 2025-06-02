require('dotenv').config();
const express = require('express');
const session = require('express-session');
const pug = require('pug');
const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./src/public'));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

//rutas
app.use('/', require('./src/routes'));

// iniciar servidor
const PORT = process.env.PORT;
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Modelos sincronizados');
    app.listen(PORT, '::', () => {
      console.log(`Servidor iniciado en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error al sincronizar modelos:', err);
  });
