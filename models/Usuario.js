const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const usuarioSchema = new mongoose.Schema({
    nombreUsuario: {
        type: String,
        required: true,
        unique: true,
    },

    contraseña: {
        type: String,
        required: true,
    },

    rol: {
        type: String,
        required: true,
        enum: ['admin', 'user'],
    }
});

// ============================================================
// ENCRIPTAR CONTRASEÑA ANTES DE GUARDAR
// ============================================================

usuarioSchema.pre('save', async function () {

    // Si la contraseña no ha cambiado, no hacemos nada.
    if (!this.isModified('contraseña')) {
        return;
    }

    // Generar salt
    const salt = await bcrypt.genSalt(10);

    // Encriptar contraseña
    this.contraseña = await bcrypt.hash(this.contraseña, salt);
});

// ============================================================
// MODELO
// ============================================================

module.exports = mongoose.model('Usuario', usuarioSchema);

