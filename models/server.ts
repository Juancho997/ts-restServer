import express, {Application} from 'express';
import userRoutes from '../routes/users';
import cors from 'cors';
import morgan from 'morgan';
import db from '../db/connection';

export default class Server{
    
    private app : Application;
    private port : number;
    private apiPaths = {
        usuarios : '/api/users'
    }
    
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.dbConnection();
        this.middlewares();
        this.routes();
    };

    async dbConnection(){
        try{

            await db.authenticate();
            console.log(`Database > ${process.env.DB_NAME} < connected`)

        } catch(error:any){
            throw new Error(error)
        }
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(morgan('dev'));
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.apiPaths.usuarios, userRoutes)
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Server on port ${this.port}`)
        })
    }
};