import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import User, { UserAttributes } from '../models/usuario';

const validarJWT = async ( req: Request, res: Response, next: NextFunction ) => {

    
    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            msg: 'No existe el x-token'
        });
    }

    try {
        
        const { email } = jwt.verify( token, process.env.SECRETORPRIVATEKEY as Secret ) as JwtPayload;

        const userToken = await User.findOne({ where: { email, status: true } });

        if ( !userToken ) {
            throw new Error("Usuario no encontrado");
        }

        req.usuario = userToken.toJSON();

        next();

    } catch (error) {
        console.log( error );
        return res.status(401).json({
            msg: 'Token no valido'
        });
    }
}


export default validarJWT;