import Registration from '../model/registration.model.js'

export const getRegistrationList=async (req,res)=>{

    try {
        
    const list =await Registration.find()
    .populate("country", "name")
    .populate("state", "name")
    .populate("city", "name");;
    
    if(list.length>0){
        res.json({
            success:true,
            message:`Registration list fetched successfully`,
            data:list
        })
    }else if(list.length===0){
        res.json({
            success:true,
            message:`Registration list is empty`,
            data:[]
        })
    }else{
        res.json({
            success:false,
            message:`Error occured while fetching the registration list`
        })
    }

    } catch (error) {
        res.json({
            success:false,
            message:`Error occured in server ${error.message}`
        })
    }
}

export const createRegistration=async (req,res)=>{
    try {
        const response=await Registration.create(req.body)
        response.save();

        if(response){
            res.json({
                success:true,
                message:"Registration created successfully",
                data:response
            })
        }else{
            res.json({
                success:false,
                message:"Error occured while creating the registration",
                data:response
            })
        }
        
    } catch (error) {
        res.json({
            success:false,
            message:`Error occured in server ${error.message}`
        })
    }
}