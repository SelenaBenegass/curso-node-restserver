import express from 'express'

import cors from 'cors'

import * as dotenv from 'dotenv'
dotenv.config()

import { router } from '../routes/user.js';

import { dbCNN } from '../db/config.js'


class Server {

    constructor() {
        this.app = express();

        this.port = process.env.PORT;

        this.usuariosPath = '/api/usuarios'

        //Conectar a base de datos
        this.dbConnection();

        // Middlewares: Funciones que van a añadirle otra funcicionalidad al webserver, es una funcion que siempre va a ejecutarse al levantar el servidor
        this.middlewares();

        // Rutas de mi app
        this.routes();
    }

    async dbConnection() { 
        await dbCNN()
    }

    middlewares() {

        //CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio publico 
        this.app.use(express.static('public'));
    }

    routes() {

        this.app.use(this.usuariosPath, router);

    }

    listen() {

        this.app.listen(this.port, () => {
            console.log(`Listening at http://localhost:${this.port}`.bgGreen)
        })
    }


}

export default Server;