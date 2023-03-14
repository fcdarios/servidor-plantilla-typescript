import { Request, Response } from "express";
import bcryptjs from "bcryptjs";;


import User from '../models/usuario';


// Obtener todos los usuarios
export const getUsuarios = async (req: Request, res: Response) => {
    const usuarios = await User.findAll();
    return res.json( usuarios );
}


// Obtener un usuario por su id
export const getUsuario = async (req: Request, res: Response) => {

    const { id } = req.params;

    const usuario = await User.findByPk( id );

    
    if ( !usuario ) {
        return res.status(404).json({
            msg: `No existe un usuario con el id ${ id }`
        });
    }

    return res.json( usuario );
}

/** 
 * Crear un usuario
 */ 
export const postUsuarios = async (req: Request, res: Response) => {

    const { password, ...data} = req.body;

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

/** 
 * Actualizar un usuario por id
 */ 
export const putUsuarios = async(req: Request, res: Response) => {

    const { id } = req.params;
    const { id: _id, password, email, status, ...resto } = req.body;

    // Encriptar la contraseña
    if ( password ) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync ( password, salt );
    }

    try {
        const usuario = await User.findByPk( id );
        await usuario?.update( resto );
        
        return res.json({ usuario });

    } catch ( error) {
        console.log( error );
        return res.status(500).json({
            error: 'Hable con el administrador'
        });
    }

}

/** 
 * Eliminar un usaurio por id
 */ 
export const deleteUsuarios = async (req: Request, res: Response) => {
    
    const { id } = req.params;

    try {
        const usuario = await User.findByPk( id );
        await usuario?.update( { status: false } );

        return res.json({ msg: `El usuario ${ id } a sido eliminado` });

    } catch ( error) {
        console.log( error );
        return res.status(500).json({
            error: 'Hable con el administrador'
        });
    }
}