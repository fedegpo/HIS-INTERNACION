require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const pug = require('pug');
const app = express();
const sequelize = require('./db/connection');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


//rutas
app.use('/', require('./routes'));

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
