import { validationResult } from "express-validator"

const validarCampos = (req, res, next) => { //se usa el next para avisar que pase al siguiente middleware

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        return res.status(400).json(errors);

    }

    next(); //Si llega a este punto sigue el siguiente middleware

}

export {
    validarCampos,
}