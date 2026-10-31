const Paciente = require('../models/Paciente');

exports.createPaciente = async (req, res) => {
    try {
        const { nombre, telefono, email, direccion } = req.body;
        const newPaciente = new Paciente({ nombre, telefono, email, direccion });
        const savedPaciente = await newPaciente.save();
        res.status(201).json(savedPaciente);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getPacientes = async (req, res) => {
    try {
        // .sort({ createdAt: -1 }) para que los más nuevos salgan primero
        const pacientes = await Paciente.find().sort({ createdAt: -1 });
        res.status(200).json(pacientes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updatePaciente = async (req, res) => {
    try {
        const pacienteId = req.params.id;
        const { nombre, telefono, email, direccion } = req.body;
        const updatedPaciente = await Paciente.findByIdAndUpdate(
            pacienteId,
            { nombre, telefono, email, direccion },
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
        const deletedPaciente = await Paciente.findByIdAndDelete(pacienteId);
        if (!deletedPaciente) {
            return res.status(404).json({ message: 'Paciente no encontrado' });
        }   
        res.status(200).json({ message: 'Paciente eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};