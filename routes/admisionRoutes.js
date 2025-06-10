const express = require('express');
const router = express.Router();
const admisionController = require('../controllers/admisionController');
const { estaAutenticado } = require('../middleware/authMiddleware');

router.get('/', estaAutenticado, admisionController.listarAdmisiones);

router.get('/nueva', estaAutenticado, admisionController.mostrarFormularioNuevaAdmision);
router.post('/nueva', estaAutenticado, admisionController.procesarNuevaAdmision);

router.get('/:admisionId', estaAutenticado, admisionController.verDetalleAdmision);
router.post('/:admisionId/dar-de-alta', estaAutenticado, admisionController.procesarAlta);

router.get('/:admisionId/asignar-cama', estaAutenticado, admisionController.mostrarFormularioAsignarCama);
router.post('/:admisionId/asignar-cama', estaAutenticado, admisionController.procesarAsignacionCama);

module.exports = router;
