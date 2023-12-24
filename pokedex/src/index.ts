import mongoose from 'mongoose';
import express, { Request, Response } from 'express';
import habilityRoutes from './routes/habilities.routes';
import pokedexRoutes from './routes/pokedex.routes';
import userRoutes from './routes/user.routes'

//Connection String para la conexion de mongo
const connectionString = 'mongodb+srv://carlosleiva:carlitos2003@example.lcmdr7p.mongodb.net/';

//Express app
const app = express();
const port = 3000;
app.use(express.json());

//Metodo de autorizacion
const authenticationMiddleware = (req: Request, res: Response,next: () => any) => {
    if(req.headers.authorization == 'Basic Y2FybG9zOjIxMDc='){
        next();
    }else{
        return res.status(401).json({message: 'El usuario no esta autorizado'})
    }
}

//Usar rutas
app.use('/habilities',authenticationMiddleware,habilityRoutes);
app.use('/pokemon', authenticationMiddleware ,pokedexRoutes);
app.use('/users', userRoutes);



const main = async () => {
    await mongoose.connect(connectionString);

    app.listen(port,() => {
        console.log(`La aplicación esta escuchando en el puerto ${port}`)
    })
};

main();

