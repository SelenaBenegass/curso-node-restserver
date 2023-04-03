import { Role } from '../models/role.js'
import { Usuario } from '../models/user.js'

//Esta función valida si el rol ingresado existe en la base de datos
const esRoleValido = async(rol='') => {
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol: ${rol} no existe.`)
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
            throw new Error(`El id: ${id}, no encuentra registrado.`)
        }
    }

export {
    esRoleValido,
    emailExiste,
    existeUsuarioById,
}