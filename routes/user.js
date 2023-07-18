import { Router } from 'express'
import { check } from 'express-validator';

// - Antes:
// import { validarCampos } from '../middlewares/validar-campos.js';
// import { validarJWT } from '../middlewares/validar-jwt.js';
// import { esAdminRole, tieneRol } from '../middlewares/validar-roles.js';
// - Despues:
import { validarCampos, validarJWT, esAdminRole, tieneRol } from '../middlewares/index.js'; 

import { emailExiste, esRoleValido, existeUsuarioById, esUsuarioActivo } from '../helpers/db-validators.js';

import {
    usuariosDelete,
    usuariosGet,
    usuariosPost,
    usuariosPut
} from '../controllers/user.js'




export const userRouter = Router();

userRouter.get('/', usuariosGet);

userRouter.put('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('rol').custom(esRoleValido),
    check('id').custom(existeUsuarioById),
    check('id').custom(esUsuarioActivo),
    validarCampos
], usuariosPut);


userRouter.post('/', [
    /**
     * Estos check serían las reglas que verifican que los datos ingresados sean correctos.
     * */
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y debe contener al menos 6 caracteres.').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(emailExiste),
    // check('role', 'El rol no es válido').isIn( ['ADMIN_ROLE', 'USER_ROLE'] ), //Acá se verifica que el rol ingresado exista en el arreglo
    check('rol').custom(esRoleValido), //Acá se verifica que exista en la base de datos
    validarCampos
], usuariosPost);

userRouter.delete('/:id', [
    validarJWT,
    // esAdminRole, //Este middleware obliga que si o si sea administrador
    tieneRol('USER_ROLE', 'VENTAS_ROLE'), //Este middelware es más "flexible" le puedo mandar los roles que tienen permiso
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeUsuarioById),
    check('id').custom(esUsuarioActivo),
    validarCampos
], usuariosDelete);

export default userRouter;