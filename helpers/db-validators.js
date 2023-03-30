import { Role } from '../models/role.js'

const esRoleValido = async(rol='') => {
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol: ${rol} no existe.`)
    }
}

export {
    esRoleValido,
}