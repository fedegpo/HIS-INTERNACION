const express = require('express');
const router = express.Router();
const camaController = require('../controllers/camaController');
const { estaAutenticado } = require('../middleware/authMiddleware');

router.get('/', estaAutenticado, camaController.listarCamas);

module.exports = router;
