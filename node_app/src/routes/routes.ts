import Router from "express";
import userModel from '../collections/user.collection';
import { User } from '../models/user.interface';

const router = Router();

//Trae todos los usuarios
router.get('/',async (req, res) => {
    const allPeople = await userModel.find({}).lean().exec();
    res.status(200).json(allPeople);
});

//Trae Usario por id
router.get('/:username', async (req, res) => {
    const username = req.params.username;
    const person = await userModel.find({ username }).lean().exec();

    if (person.length === 0){
        res.status(404).json({message: "No hay personas con ese usuario"});
    }else{
        res.status(200).json(person);
    }
});

//Crear un usuario
router.post('/',async (req,res)=>{
    
    const p: User = {
        username: req.body.username,
        password: req.body.password
    };

    const person = await userModel.create({
        username: p.username,
        password: p.password,
    });
    res.status(201).json(person);
});

//Modificar un usuario
router.put('/:username',async (req,res)=>{
    await userModel.updateOne({ username: req.params.username }, { $set: {password: req.body.password } });
    res.status(202).json({message: "Usuario modificado"});
});

//Borrar Usuario
router.delete('/:username',async (req,res)=>{
    await userModel.deleteOne({ username: req.params.username });
    res.status(202).json({message: "Usuario eliminado"});
});


export default router;
