const express = require('express');
const router = express.Router();
const admisionController = require('../controllers/admisionController');
const { estaAutenticado } = require('../middleware/authMiddleware');

router.get('/nueva', estaAutenticado, admisionController.mostrarFormularioNuevaAdmision);
router.post('/nueva', estaAutenticado, admisionController.procesarNuevaAdmision);

module.exports = router;
