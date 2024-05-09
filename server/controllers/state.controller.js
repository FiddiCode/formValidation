import State from '../model/state.model.js'

export const getStateList =async (req,res)=>{
  try {
    const filter={};

    if(req.query){
         filter.country=req.query.country
    }

    const data=await State.find(filter);
    if(data.length>0){
        res.json({
            success:true,
            message:`States fetched successfully`,
            data:data
        })
    }else if(data.length===0){
        res.json({
            success:true,
            message:`State list is empty`,
            data:[]
        })
    }else{
        res.json({
            success:false,
            message:`Error occured while fetching the states list`
        })
    }
    
  } catch (error) {
    res.json({
        success:false,
        message:`Error occured in server ${error.message}`
    })
  }
}

export const createState=async (req,res)=>{
try {
    const response =await State.create(req.body);
        await response.save();
        if(response){
            res.json({
                success:true,
                message:`State added successfully`
            })
        }else{
            res.json({
                success:false,
                message:`Error occured while adding state`
            })
        }
} catch (error) {
    res.json({
        success:false,
        message:`Error occured in server ${error.message}`
    })
}
}