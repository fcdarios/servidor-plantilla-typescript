import jwt, { Secret } from "jsonwebtoken";

const generarJWT = ( email: string ) => {

    return new Promise( (resolve, reject) => {

        const payload = { email };
        
        jwt.sign( payload, process.env.SECRETORPRIVATEKEY as Secret, {
            expiresIn: '24h'
        }, ( err, token ) => {
            if ( err ) {
                console.log( err );
                reject( 'No se pudo generar el token ');
            } else {
                resolve( token );
            }
        });
    });

}

export default generarJWT;