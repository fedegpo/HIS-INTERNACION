const express = require('express');
const router = express.Router();
const db = require('../models/db');

// Página principal
router.get('/', (req, res) => {
  res.render('index', { title: 'Inicio - Sistema HIS' });
});

// Lista de pacientes
router.get('/pacientes', (req, res) => {
  db.query('SELECT * FROM pacientes', (err, results) => {
    if (err) throw err;
    res.render('pacientes', { title: 'Listado de Pacientes', pacientes: results });
  });
});

// Crear paciente (formulario)
router.get('/pacientes/nuevo', (req, res) => {
  res.render('nuevo_paciente', { title: 'Nuevo Paciente' });
});

// Guardar paciente
router.post('/pacientes', (req, res) => {
  const { nombre, apellido, dni, edad } = req.body;
  db.query('INSERT INTO pacientes (nombre, apellido, dni, edad) VALUES (?, ?, ?, ?)',
    [nombre, apellido, dni, edad],
    (err) => {
      if (err) throw err;
      res.redirect('/pacientes');
    });
});

module.exports = router;
