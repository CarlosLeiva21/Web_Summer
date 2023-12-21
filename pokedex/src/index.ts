import mongoose from 'mongoose';
import express from 'express';
import habilityRoutes from './routes/habilities.routes';
import pokedexRoutes from './routes/pokedex.routes';
import userRoutes from './routes/user.routes'

//Connection String para la conexion de mongo
const connectionString = 'mongodb+srv://carlosleiva:carlitos2003@example.lcmdr7p.mongodb.net/';

//Express app
const app = express();
const port = 3000;
app.use(express.json());

//Usar rutas
app.use('/habilities',habilityRoutes);
app.use('/pokemon', pokedexRoutes);
app.use('/users', userRoutes);


const main = async () => {
    await mongoose.connect(connectionString);

    app.listen(port,() => {
        console.log(`La aplicación esta escuchando en el puerto ${port}`)
    })
};

main();

