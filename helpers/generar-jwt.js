import jwt from 'jsonwebtoken';

export const generarJWT = (uid) => { //uid: user identifire

    return new Promise((resolve, reject) => {
        //payload es lo que va dentro del token
        const payload = { uid };
        // secretOrPrivateKey: es la llave para firmar tokens
        // {opciones} entre corchetes van las opciones
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY,{ 
            expiresIn: '5h' //El token expira en 5hs, puedo poner 35d.. lo que quiera
        },(err, token)=> { //err: error u obtengo el token si todo sale bien
            if(err){
                console.log(err);
                reject('No se pudo generar el token');
            } else {
                resolve(token);
            }
        }) 
    })

}