
import mongoose from "mongoose"

const pokedexSchema = new mongoose.Schema({
    _id: {
        type: Number,
        require: true,
    },
    name:{
        type: String,
    },
    habilities:{
        type: Array
    },
    primaryType:{
        type: String,
        require: true,
    },
    secondaryType:{
        type: String,
        require: false,
    },
    description:{
        type: String
    }
});

export default mongoose.model('Pokedex', pokedexSchema)
