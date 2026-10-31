const paciente = require('../models/Paciente');

// Controller methods for handling paciente-related requests
exports.createPaciente = async (req, res) => {
    try {
        const { nombre } = req.body;
        const newPaciente = new paciente({ nombre });
        const savedPaciente = await newPaciente.save();
        res.status(201).json(savedPaciente);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getPacientes = async (req, res) => {
    try {
        const pacientes = await paciente.find();
        res.status(200).json(pacientes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updatePaciente = async (req, res) => {
    try {
        const pacienteId = req.params.id;
        const { nombre } = req.body;
        const updatedPaciente = await paciente.findByIdAndUpdate(
            pacienteId,
            { nombre },
            { new: true }
        );
        if (!updatedPaciente) {
            return res.status(404).json({ message: 'Paciente no encontrado' });
        }
        res.status(200).json(updatedPaciente);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deletePaciente = async (req, res) => {
    try {
        const pacienteId = req.params.id;
        const deletedPaciente = await paciente.findByIdAndDelete(pacienteId);
        if (!deletedPaciente) {
            return res.status(404).json({ message: 'Paciente no encontrado' });
        }   
        res.status(200).json({ message: 'Paciente eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

