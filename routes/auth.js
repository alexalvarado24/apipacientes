// routes/auth.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');

// ==================== LOGIN ====================
const login = async (req, res) => {
  try {
    const { nombreUsuario, contraseña } = req.body;
    const usuario = await Usuario.findOne({ nombreUsuario });

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const esCoincidente = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!esCoincidente) {
      return res.status(400).json({ mensaje: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { id: usuario._id, rol: usuario.rol },
      'claveSecreta',
      { expiresIn: '1h' }
    );

    res.json({ token, usuario: { id: usuario._id, nombreUsuario: usuario.nombreUsuario, rol: usuario.rol } });
  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor', error: error.message });
  }
};

// ==================== REGISTER ====================
const register = async (req, res) => {
  try {
    const { nombreUsuario, contraseña, rol } = req.body;

    const usuarioExistente = await Usuario.findOne({ nombreUsuario });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El usuario ya existe' });
    }

    const nuevoUsuario = new Usuario({ nombreUsuario, contraseña, rol });
    await nuevoUsuario.save();

    res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor', error: error.message });
  }
};

// ==================== RUTAS ====================
router.post('/login', login);
router.post('/register', register);

module.exports = router;