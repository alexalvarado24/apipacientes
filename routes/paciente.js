const express = require('express');
const router = express.Router();
const {getPacientes, createPaciente, updatePaciente, deletePaciente}= require('../controllers/pacienteController');

router.post('/', createPaciente);
router.get('/', getPacientes);
router.put('/:id', updatePaciente);
router.delete('/:id', deletePaciente);   

module.exports = router;