import jwt from 'jsonwebtoken';
import {response, request} from 'express';

import { Usuario } from '../models/index.js'

export const validarJWT =async (req = request, res = response, next) => {

    const token = req.header('x-token'); //Token del usuario que realiza la acción.
    const { id } = req.params; //id del usuario que desea borrar.

    if(!token) { //Si no ingresa toquen:
        return res.status(401).json({
            msg: 'El token es obligatorio.'
        });
    }

    try {
        
        //Verifica que el token sea valido, si no lo es, cae al catch
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        //Si el token es valido, busca al usuario autenticado
        const autenticador = await Usuario.findById(uid);

        req.autenticador = autenticador;
      
        next();

    } catch (error) {
        
        console.log(error);
        res.status(401).json({
            msg: 'Token invalido.'
        })
    }
}
