const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/registro', authController.mostrarFormularioRegistro);
router.post('/registro', authController.procesarRegistro);
router.get('/login', authController.mostrarFormularioLogin);
router.post('/login', authController.procesarLogin);
router.get('/logout', authController.procesarLogout);

module.exports = router;
