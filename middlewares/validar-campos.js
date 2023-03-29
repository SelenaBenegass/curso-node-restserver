import { validationResult } from "express-validator"

const validarCampos = (req, res, next) => { //se ua el next para avisar que pase al siguiente middleware

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        return res.status(400).json(errors);

    }

    next();

}

export {
    validarCampos,
}