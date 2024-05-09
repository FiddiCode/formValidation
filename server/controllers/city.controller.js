import City from '../model/city.model.js'

export const getCitiesList =async (req,res)=>{
  try {
    const filter={};

    if(req.query){
         filter.state=req.query.state
    }

    const data=await City.find(filter);
    if(data.length>0){
        res.json({
            success:true,
            message:`Cities fetched successfully`,
            data:data
        })
    }else if(data.length===0){
        res.json({
            success:true,
            message:`Cities list is empty`,
            data:[]
        })
    }
        else{
        res.json({
            success:false,
            message:`Error occured while fetching the cities list`
        })
    }
    
  } catch (error) {
    res.json({
        success:false,
        message:`Error occured in server ${error.message}`
    })
  }
}

export const createCity=async (req,res)=>{
try {
    const response =await City.create(req.body);
        await response.save();
        if(response){
            res.json({
                success:true,
                message:`City added successfully`
            })
        }else{
            res.json({
                success:false,
                message:`Error occured while adding city`
            })
        }
} catch (error) {
    res.json({
        success:false,
        message:`Error occured in server ${error.message}`
    })
}
}