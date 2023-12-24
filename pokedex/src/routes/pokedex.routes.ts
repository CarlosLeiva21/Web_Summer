import Router from "express";
import pokedexCollection from "../collections/pokedex.collection";
import Pokedex from "../model/pokedex.interface"
import habilityCollection from "../collections/hability.collection";

const router = Router();

//Functions 
async function checkHability(habilities:number[]): Promise<number> {
    for(const hability of habilities){
        const response = await habilityCollection.find({_id: hability}).lean().exec();

        if(response.length === 0){
            return hability
        }
    }
    return 0;
}

//Metodo para obtener todos los pokemones
router.get('/',async (req, res) => {
    const allPokemons = await pokedexCollection.find({}).lean().exec();
    res.status(200).json(allPokemons);
});

//Metodo para obtener un pokemon por su id
router.get('/:pokedexNumber',async (req, res) => {
    const pokemon = await pokedexCollection.find({ _id: req.params.pokedexNumber }).lean().exec();
    res.status(200).json(pokemon);
});

//Metodo para crear un pokemon
router.post('/', async (req, res) => {

    var existHability: boolean = true;

    const lastPokemon = await pokedexCollection.find().limit(1).sort({$natural:-1});

    let newId: number;

    if (lastPokemon.length > 0) {
        newId = (lastPokemon[0]?._id ?? 0) + 1;
    } else {
        newId = 1;
    }

    const p: Pokedex = {
        _id: newId,
        name: req.body.name,
        habilities: req.body.habilities,
        primaryType: req.body.primaryType,
        secondaryType: req.body.secondaryType,
        description: req.body.description
    };

    const response = await checkHability(p.habilities);

    if (response !== 0){
        res.status(404).json({message: `Habilidad con id ${response} no encontrada`})
        return
    }

    const pokemon = await pokedexCollection.create({
        _id: p._id,
        name: p.name,
        habilities: p.habilities,
        primaryType: p.primaryType,
        secondaryType: p.secondaryType,
        description: p.description
    });

    res.status(201).json(pokemon);
})

//Metodo para modificar un pokemon
router.put('/:pokedexNumber',async (req, res) => {
    await pokedexCollection.updateOne({ _id:req.params.pokedexNumber }, 
        { $set: {
            name: req.body.name, 
            habilities: req.body.habilities, 
            primaryType: req.body.primaryType, 
            secondaryType: req.body.secondaryType, 
            description: req.body.description 
            } 
        })
    res.status(202).json({message: "Pokemon modificado"});
});

//Metodo para borrar un pokemon
router.delete('/:pokedexNumber',async (req, res) => {
    await pokedexCollection.deleteOne({ _id:req.params.pokedexNumber });
    res.status(202).json({message: "Pokemon eliminado"});    
})


export default router;
