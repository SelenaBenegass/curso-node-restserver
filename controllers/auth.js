/* La siguiente línea no va más
// const {response} = require('express');
Se reemplaza por:
// import { response } from "express";
*/
import bcryptjs from 'bcryptjs';
import { response } from "express";
import { Usuario } from "../models/user.js";
import { generarJWT } from "../helpers/generar-jwt.js";

export const login = async (req, res = response) => {
    const { correo, password } = req.body;
    try {
        //verificar si el mail existe
        const usuario = await Usuario.findOne({ correo });
        //Si el correo no existe o existe pero el estado es false, da error
        if (!usuario || !usuario.estado) {
            return res.status(400).json({
                msg: 'Mail incorrecto.'
            })
        }
        // const validPassword = ; 
        if (!(bcryptjs.compareSync(password, usuario.password))) {
            return res.status(400).json({
                msg: 'Calve incorrecta.'
            })
        }

        //generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario, token
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Ocurrio un error, comunicarse con el área de desarrollo.'
        })
    }
}


