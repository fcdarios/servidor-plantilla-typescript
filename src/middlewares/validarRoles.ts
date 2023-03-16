import { NextFunction, Request, Response } from 'express';



export const validarRoles = ( ...roles: string[]  ) => {
    return (req: Request, res: Response, next: NextFunction) => {
        
        if ( !req.usuario ) {
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            });
        }

        if ( !roles.includes( req.usuario.role ) ) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${ roles }`
            });
        }


        next();
    }
    
}
