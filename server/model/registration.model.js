import mongoose from "mongoose";


const registrationSchema=mongoose.Schema({
    firstName:{
        type:String,
        required:[true,"First name is required"]
    },
    lastName:{
        type:String,
        required:[true,"Last name is required"]
    },
    email:{
        type:String,
        required:[true,"Email is required"]
    },
    country:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Country",
        required:[true,"Country is required"]
    },
    state:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"State",
        required:[true,"State is required"]
    },
    city:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"City",
        required:[true,"City is required"]
    },
    gender:{
        type:String,
        required:[true,"Gender is required"]
    },
    dob:{
        type:Date,
        required:[true,"Date of birth is required"]
    },
    age:{
        type:Number,
        required:[true,"Age is required"]
    }

},{timestamps:true});


const Registration=mongoose.model("Registration",registrationSchema);

export default Registration;