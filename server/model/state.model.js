import mongoose from "mongoose";

const stateSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,'State name is required']
    },
    country:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"Country name of the state is required"]
    }
})


const State=mongoose.model("State",stateSchema);


export default State;