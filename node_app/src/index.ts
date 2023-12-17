import mongoose from 'mongoose';
import express from 'express';
import userRoutes from './routes/routes'

//Connection String para la conexion de mongo
const connectionString = 'mongodb+srv://carlosleiva:carlitos2003@example.lcmdr7p.mongodb.net/';

//Express app
const app = express();
const port = 3000;

app.use(express.json());

app.use('/user', userRoutes)


const main = async () => {
    await mongoose.connect(connectionString);

    app.listen(port,() => {
        console.log(`La aplicación esta escuchando en el puerto ${port}`)
    })
};

main();

