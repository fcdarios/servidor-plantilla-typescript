import { Request, Response } from "express";
import User from "../models/usuario";
import bcryptjs from 'bcryptjs';


//
export const auth = async (req: Request, res: Response) => {

    return res.json({ msg: "Auth" });
}


//
export const authLogin = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    try {

        // Verificar si el correo existe
        const usuario = await User.findOne({ where: { email, status: true } });

        if ( !usuario ) {
            return res.status(400).json({
                error: 'email / password no son correctos | email'
            });
        }

        // Verificar la contraseña
        const isValidPassword = bcryptjs.compareSync( password, usuario.password );
        if ( !isValidPassword ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - Password'
            });
        }

        return res.json({
            msg: "AAAAAAAA"
        });

    } catch (error) {
        console.log( error );
        return res.status(500).json({
            error: 'Hable con el administrador'
        });
    }
}


//
export const authRegister = async (req: Request, res: Response) => {

    return res.json({ msg: "Auth - Register" });
}
