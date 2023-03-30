import { Router } from 'express'
import { check } from 'express-validator';

import { validarCampos } from '../middlewares/validar-campos.js';
import { emailExiste, esRoleValido } from '../helpers/db-validators.js';

import {
    usuariosDelete,
    usuariosGet,
    usuariosPost,
    usuariosPut
} from '../controllers/user.js'


export const router = Router();

router.get('/', usuariosGet);

router.put('/:id', usuariosPut);

router.post('/', [
    /**
     * Estos check serían las reglas que verifican que los datos ingresados sean correctos.
     * */
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y debe contener al menos 6 caracteres.').isLength({ min: 6}),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(emailExiste),
    // check('role', 'El rol no es válido').isIn( ['ADMIN_ROLE', 'USER_ROLE'] ), //Acá se verifica que el rol ingresado exista en el arreglo
    check('rol').custom(esRoleValido), //Acá se verifica que exista en la base de datos
    validarCampos
], usuariosPost);

router.delete('/', usuariosDelete);

export default router;