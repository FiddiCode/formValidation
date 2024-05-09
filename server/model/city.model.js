import mongoose from "mongoose";

const citySchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,'City name is required']
    },
    state:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"State of the city is required"]
    }
})


const City=mongoose.model("City",citySchema);


export default City;