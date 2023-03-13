
import express, { Application } from 'express';
import cors from  'cors';

import userRoutes from '../router/usuario';
import authRoutes from '../router/auth';
import db from '../db/connection';



class Server {
    
    private app: Application;
    private port: number;
    private apiPaths = {
        auth: '/api/auth',
        usuarios: '/api/usuarios',
    }
    
    
    constructor() {
        this.app = express();
        this.port = Number(process.env.PORT) || 8001;

        // Conectar a base de datos
        this.dbConnection(); 

        // Middlewares
        this.middlewares();
  
        // Definir rutas
        this.routes();
    }


    routes(){

        this.app.use( this.apiPaths.auth,     authRoutes);
        this.app.use( this.apiPaths.usuarios, userRoutes);
    }

    // Conectar a base de datos
    async dbConnection(){

        try {

            await db.authenticate();
            console.log("Database Online");
            
        } catch (error) {
            
            throw new Error("Error al conectar la base de datos");
        }
          
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio publico
        this.app.use( express.static('./src/public') );
    }

    listen() {

        this.app.listen( this.port, () => {
            console.log('Servidor TS corriendo en el puerto: ' + this.port );
        });

   }

}

export default Server;