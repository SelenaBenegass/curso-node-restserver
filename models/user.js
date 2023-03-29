import { Schema, model } from 'mongoose'

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },

    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },

    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },

    img: {
        type: String,
    },

    role: {
        type: String,
        require: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },

    estado: {
        type: Boolean,
        default: true
    },

    google: {
        type: Boolean,
        default: false
    },

});

// Lo siguiente esta comentado porque es del video del curso de node pero esta desactualizado:

// module.exports = model('Usuario', UsuarioSchema); 

//Se cambia por:
const Usuario = model('Usuario', UsuarioSchema);

export {
    Usuario,
}
