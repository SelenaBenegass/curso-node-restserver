import { Router } from 'express'
import { check } from 'express-validator';

import {
    usuariosDelete,
    usuariosGet,
    usuariosPost,
    usuariosPut
} from '../controllers/user.js'

import { validarCampos } from '../middlewares/validar-campos.js';

export const router = Router();

router.get('/', usuariosGet);

router.put('/:id', usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y debe contener al menos 6 caracteres.').isLength({ min: 6}),
    check('correo', 'El correo no es válido').isEmail(),
    check('role', 'El rol no es válido').isIn( ['ADMIN_ROLE', 'USER_ROLE'] ),
    validarCampos
], usuariosPost);

router.delete('/', usuariosDelete);

export default router;