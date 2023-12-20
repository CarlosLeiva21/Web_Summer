
import mongoose from "mongoose"

const habilitySchema = new mongoose.Schema({
    _id: {
        type: Number,
        require: true,
    },
    name:{
        type: String,
    },
    description:{
        type: String
    }
});

export default mongoose.model('Hability', habilitySchema)
