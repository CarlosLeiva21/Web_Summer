import Router from "express";
import habilitiesCollection from "../collections/hability.collection";
import Hability from "../model/hability.interface"

const router = Router();

//Metodo para obtener todas las habilidades
router.get('/',async (req, res) => {
    const allHabilities = await habilitiesCollection.find({}).lean().exec();
    res.status(200).json(allHabilities);
});

//Metodo para crear una habilidad
router.post('/', async (req, res) => {

    const lastHability = await habilitiesCollection.find().limit(1).sort({$natural:-1});

    let newId: number;

    if (lastHability.length > 0) {
        newId = (lastHability[0]?._id ?? 0) + 1;
    } else {
        newId = 1;
    }

    const h: Hability = {
        _id: newId,
        name: req.body.name,
        description: req.body.description
    };

    const hability = await habilitiesCollection.create({
        _id: h._id,
        name: h.name,
        description: h.description
    });

    res.status(201).json(hability);
})


export default router;
