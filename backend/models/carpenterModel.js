import mongoose from "mongoose";

const carpenterSchema=new mongoose.Schema({
    name:{type:String,required:true},
    age:{type:Number,required:true},
    experience:{type:String,required:true},
    fees:{type:Number,required:true},
    mobile:{type:Number,required:true},
    expertise:{type:String,required:true},
    availabe:{type:Boolean},
    about:{type:String,required:true},
    available: { type: Boolean, default: true }, 
    date:{type:Number,required:true},
    slots_booked:{type:Object,default:{}}
},{minimize:false})

const carpenterModel=mongoose.model.carpenter || mongoose.model('carpenter',carpenterSchema)

export default carpenterModel