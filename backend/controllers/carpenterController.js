import carpenterModel from "../models/carpenterModel.js";


const changeAvailability = async (req,res)=>{
    try {
        const {carpId}=req.body

        const carpData=await carpenterModel.findById(carpId) 
        await carpenterModel.findByIdAndUpdate(carpId,{available:!carpData.available})
        res.json({success:true,message:"Availabiility Changed"})  
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

const carpenterList = async (req,res)=>{
    try {
        const carpenters=await carpenterModel.find({})
        res.json({success:true,carpenters})
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

export  {changeAvailability,carpenterList}