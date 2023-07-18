import { Router } from 'express';
import { check } from 'express-validator';

import { login } from '../controllers/auth.js'
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';

export const catRouter = Router();

// nombreDelPath.metodo('/ruta', [checks y middelwares], funcionController);


// Ver todas las categorías - publico
catRouter.get('/', (req, res) => {
    res.json('Todo ok GET categorias');
});

// Ver una la categoría por id - publico
catRouter.get('/:id', (req, res) => {
    res.json('Todo ok GET categoriaByID');
});

// Crear una categoriía - protegido - cualquier persona con token valido 
catRouter.post('/',
    [
        // check('nombre', 'El nombre es obligatorio').notEmpty(),
        validarJWT,
        // validarCampos
    ],
    (req, res) => {
        res.json(`Todo ok CREAR categoria - usuario ${req.autenticador._id}`);
    });

//Editar una categoría - protegido - cualquier persona con token valido
catRouter.put('/:id', (req, res) => {
    res.json('Todo ok ACTUALIZAR una categoria');
});

//Eliminar una categoría - privado - sólo administrador
catRouter.delete('/:id', (req, res) => {
    res.json('Todo ok ELIMINAR una categoria');
});

export default catRouter;