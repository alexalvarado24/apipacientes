const mongoose = require('mongoose');

const pacienteSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    telefono: {
        type: String,
        default: '',
        trim: true
    },
    email: {
        type: String,
        default: '',
        trim: true
    },
    direccion: {
        type: String,
        default: '',
        trim: true
    }
}, {
    timestamps: true 
});

module.exports = mongoose.model('Paciente', pacienteSchema);