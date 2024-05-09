import Country from '../model/country.model.js'

export const getCountriesList =async (req,res)=>{
  try {
    const data=await Country.find();
    if(data.length>0){
        res.json({
            success:true,
            message:`Countries fetched successfully`,
            data:data
        })
    }else if(data.length===0){
        res.json({
            success:true,
            message:`Countries list is empty`,
            data:[]
        })
    }else{
        res.json({
            success:false,
            message:`Error occured while fetching the country list`
        })
    }
    
  } catch (error) {
    res.json({
        success:false,
        message:`Error occured in server ${error.message}`
    })
  }
}

export const createCountry=async (req,res)=>{
try {
    const response =await Country.create(req.body);
        await response.save();
        if(response){
            res.json({
                success:true,
                message:`Country added successfully`
            })
        }else{
            res.json({
                success:false,
                message:`Error occured while adding country`
            })
        }
} catch (error) {
    res.json({
        success:false,
        message:`Error occured in server ${error.message}`
    })
}
}