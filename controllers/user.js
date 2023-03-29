import { response } from "express";

import { Usuario } from '../models/user.js'

import bcryptjs from 'bcryptjs'

export const usuariosGet = (req, res = response) => {

    // Los argumentos luego de un ? son OPCIONALES y Express ya los parsea por mi
    // ejemplo: GET http://localhost:8080/api/usuarios?q=buscar&nombre=maria&apikey=1234&edad=25

    const { q, nombre = 'No name', apikey } = req.query; //desestructuro los parametros que me importan

    res.json({
        msg: 'get API',
        q,
        nombre,
        apikey
    });

    // nota: si en el url no vienen algunos de los parametros que quiero, seran undefined
    //       para que no sean undefined les puedo dejar un valor por defecto, por ej; nombre = 'No name'
    //       si vienen parametros que no mencione, simplemente los desprecio
}

export const usuariosPut = (req, res = response) => {

    const id = req.params.id;

    res.json({
        msg: 'put API',
        id //se va a mostrar como un string
    });
}

export const usuariosPost = async (req, res = response) => {

    const { nombre, correo, password, role } = req.body;
    const usuario = new Usuario({ nombre, correo, password, role });

    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        //Si existe el email debemos devolver un error (bad request)
        return res.status(400).json({ 
            msg: 'Ese correo ya está registrado'
        });
    }


    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar usuario en la BD
    await usuario.save();

    res.json({
        mmsg: 'post API',
        usuario
    });
}

export const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API'
    });
}
