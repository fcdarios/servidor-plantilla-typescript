
import Role from "../models/rol";
import User from "../models/usuario";



// Verificar si el correo existe en la base de datos
export const existeEmail = async( email: string ) => {

    const existeEmail = await User.findOne({ where: { email } });
    if ( existeEmail ) {
        throw new Error(`El correo: ${ email }, ya está registrado`);
    }
}


// Verificar si el rol es valido
export const esRolValido = async(role: string) => {

    if ( role ) {
        const existeRol = await Role.findOne({ where: { name: role} });
        if ( !existeRol ) {
            throw new Error(`El rol ${ role } no está registrado en la BD`);
        }
    }
}


// Validar si existe el usuario por el ID
export const existeUsuarioPorId = async( id: number ) => {

    const existeUsuario = await User.findOne({ where: { id, status: true }});
    if ( !existeUsuario ) {
        throw new Error(`El usuario ${ id } no existe`);
    }
}

