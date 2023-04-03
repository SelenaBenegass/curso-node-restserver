import { response } from "express";

import { Usuario } from '../models/user.js'

import bcryptjs from 'bcryptjs'

export const usuariosGet = async (req, res = response) => {

    // Los argumentos luego de un ? son OPCIONALES y Express ya los parsea por mi
    // ejemplo: GET http://localhost:8080/api/usuarios?q=buscar&nombre=maria&apikey=1234&edad=25

    const { limite = 5, desde = 0 } = req.query; //así desestructuro los parametros que me importan y con el = le doy el valor por defecto
    const query = { estado: true };
    const [total, usuarios] = await Promise.all([
        //total de usuarios activos (con "estado: true")
        Usuario.countDocuments(query),
        //usuarios activos (con "estado: true")
        Usuario.find(query)
            // .sort({nombre: 1}) //Orden ascendente
            .skip(Number(desde))
            .limit(Number(limite)),
    ]);

    res.json({
        total,
        usuarios
    });

    // nota: si en el url no vienen algunos de los parametros que quiero, seran undefined
    //       para que no sean undefined les puedo dejar un valor por defecto, por ej; nombre = 'No name'
    //       si vienen parametros que no mencione, simplemente los desprecio
}

export const usuariosPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...datos } = req.body;

    if (password) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        datos.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, datos);

    res.json(usuario);
}

export const usuariosPost = async (req, res = response) => {

    const { nombre, correo, password, role } = req.body;
    const usuario = new Usuario({ nombre, correo, password, role });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar usuario en la BD
    await usuario.save();

    res.json(usuario);
}

export const usuariosDelete = async (req, res = response) => {
    const { id } = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
    res.json(usuario);
}

