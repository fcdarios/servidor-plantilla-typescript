import { Request, Response } from "express";
import bcryptjs from 'bcryptjs';

import User from "../models/usuario";
import generarJWT from "../helpers/generarJWT";


//
export const auth = async (req: Request, res: Response) => {

    return res.json({ msg: "Auth" });
}


//
export const authLogin = async (req: Request, res: Response) => {

    const { email, password } = req.body;
    User.removeHook('afterFind','hookDeleteColumns');

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

        // Generar JWT
        const token = await generarJWT( usuario.email );

        return res.json({
            usuario,
            token
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

    const { password, role, ...data} = req.body;

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    data.password = bcryptjs.hashSync ( password, salt );

    try {
        // Crear nuevo usuario y guardarlo en DB
        const usuario = await User.create( data );
        return res.status(201).json( usuario );

    } catch (error) {
        console.log( error );
        return res.status(500).json({
            error: 'Hable con el administrador'
        });
    }
}
