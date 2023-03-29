import mongoose from "mongoose"

import colors from 'colors'

import * as dotenv from 'dotenv'
dotenv.config()


const dbCNN = async () => { //DataBaseConnection

    try {
        // Lo siguiente está comentado porque es del video del Curso de node pero esta desactualizado. y no son necesarios:

        // await mongoose.connect( process.env.MONGODB_CNN, {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        //     useCreateIndex: true,
        //     useFindAndModify: false
        // } );

        //Se cambia por lo que sigue:
        await mongoose.connect(process.env.MONGODB_CNN);

        console.log('\nBase de datos online'.bgGreen)


    } catch (error) {
        console.log(error);
        throw new Error('\nError a la hora de iniciar la base de datos'.bgRed);
    }


}

export { dbCNN };