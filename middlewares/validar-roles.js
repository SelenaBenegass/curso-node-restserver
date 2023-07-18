import { response, request } from "express";

export const esAdminRole = (req = request, res = response, next) => {

    if (!req.autenticador) {
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token primero.'
        });
    }

    const { role, nombre } = req.autenticador;
    if (role != 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: 'Su rol no tiene permisos para realizar esta acción.'
        });
    }


}
export const tieneRol = (...roles) => { //(...roles) signiifica que todo lo que manden en los parametros se guardará en un array llamado roles

    return (req = request, res = response, next) => {

        if (!req.autenticador) {
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el token primero.'
            });
        }

        if (!roles.includes(req.autenticador.role)) {
            return res.status(401).json({
                msg: 'Su rol no tiene permisos para realizar esta acción.'
            });
        }

        next();
    }




}