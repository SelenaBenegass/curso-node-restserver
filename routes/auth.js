import { Router } from 'express';
import { check } from 'express-validator';

import {login} from '../controllers/auth.js'
import { validarCampos } from '../middlewares/validar-campos.js';

export const authRouter = Router();

// nombredelPath.metodo('/ruta', [checks y middelwares],funcionController);

authRouter.post('/login',[
    check('correo', 'El correo es obligatorio.').isEmail(),
    check('password', 'La clave es obligatoria.').notEmpty(),
    validarCampos
], login);

export default authRouter;