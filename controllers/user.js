import { response } from "express";

export const usuariosGet = (req, res = response) => {

    // Los argumentos luego de un ? son OPCIONALES y Express ya los parsea por mi
    // ejemplo: GET http://localhost:8080/api/usuarios?q=buscar&nombre=maria&apikey=1234&edad=25

    const {q, nombre = 'No name', apikey} = req.query; //desestructuro los parametros que me importan

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

export const usuariosPost = (req, res = response) => {
    res.json({
        mmsg: 'post API'
    });
}

export const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API'
    });
}
