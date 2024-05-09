import mongoose from "mongoose";

const countrySchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,'City name is required']
    }
})


const Country=mongoose.model("Country",countrySchema);


export default Country;