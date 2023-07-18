import { Role, Usuario } from '../models/index.js'

//Esta función valida si el rol ingresado existe en la base de datos
const esRoleValido = async(role='') => {
    const existeRol = await Role.findOne({role});
    if(!existeRol){
        throw new Error(`El rol: ${role} no existe.`)
    }
}

// Esta función valida que el correo ingresado exista en la base de datos
const emailExiste = async(correo='') => {
const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        //Si existe el email debemos devolver un error
        throw new Error(`El correo: ${correo}, ya se encuentra registrado.`)
    }
}

// Esta función valida que exista un usario en la base de datos con el id recibido
const existeUsuarioById = async(id='') => {
    const existeUsuario = await Usuario.findById( id );
        if (!existeUsuario) {
            //Si el Usuario no existe debemos devolver un error
            throw new Error(`El id: ${id}, no se encuentra registrado.`)
        }
    }

    // Esta función valida que el usuario del id recibido, se encuentre en estado activo
const esUsuarioActivo = async(id='') => {
    const estaActivo = await Usuario.findById( id );
        if (!estaActivo.estado) {
            //Si el Usuario no se ecuentra activo
            throw new Error(`El id: ${id}, no se encuentra activo.`)
        }
    }

export {
    esRoleValido,
    emailExiste,
    existeUsuarioById,
    esUsuarioActivo,
}