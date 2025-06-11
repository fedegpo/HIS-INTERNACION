const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');
const { estaAutenticado } = require('../middleware/authMiddleware');

router.get('/:id/editar', estaAutenticado, pacienteController.mostrarFormularioEditar);

router.post('/:id/editar', estaAutenticado, pacienteController.procesarEdicion);


module.exports = router;
