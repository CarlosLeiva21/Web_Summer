import Router from "express";
import userCollection from '../collections/user.collection';
import User from '../model/user.interface'

const router = Router();

//Trae todos los usuarios
router.get('/',async (req, res) => {
    const allPeople = await userCollection.find({}).lean().exec();
    res.status(200).json(allPeople);
});

//Trae Usario por id
router.get('/:username', async (req, res) => {
    const username = req.params.username;
    const person = await userCollection.find({ username }).lean().exec();

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

    const person = await userCollection.create({
        username: p.username,
        password: p.password,
    });
    res.status(201).json(person);
});

//Modificar un usuario
router.put('/:username',async (req,res)=>{
    await userCollection.updateOne({ username: req.params.username }, { $set: {password: req.body.password } });
    res.status(202).json({message: "Usuario modificado"});
});

//Borrar Usuario
router.delete('/:username',async (req,res)=>{
    await userCollection.deleteOne({ username: req.params.username });
    res.status(202).json({message: "Usuario eliminado"});
});


export default router;
