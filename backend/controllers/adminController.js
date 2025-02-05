import {v2 as cloudinary} from 'cloudinary'
import carpenterModel from '../models/carpenterModel.js'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/AppointmentModel.js'


// api to add carpenter
const addCarpenter = async (req,res) =>{
    try {
        const {name,age,experience,fees,mobile,expertise,about}=req.body
        console.log(name,age,experience,fees,mobile,expertise,about);
        if(!name || !age || !experience || !fees || !mobile || !expertise || !about)
        {
            return res.json({success:false,message:'Missing Details'});
        }

        
        const carpenterData={
            name,age,experience,fees,mobile,expertise,about,date:Date.now()
        }
        const newCarpenetr=new carpenterModel(carpenterData)
        await newCarpenetr.save()

        res.json({success:true,message:"Carpenter Added"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
}

// api for admin login 
const adminLogin = async (req,res) =>{
    try {
        const {email,password}=req.body;
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD)
        {
            const token =jwt.sign(email+password,process.env.JWT_SECRET);
            res.json({success:true,token});
        }
        else{
            res.json({success:false,message:"Invalid credentials"})
        }

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

//api to get all carpenters

const getCarpenters = async (req,res) =>{
    try {
        const carpenters=await carpenterModel.find({})
        res.json({success:true,carpenters})
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

// api to get all admin appointments

const adminAppointments = async (req,res)=>{
    try {
        const appointments=await appointmentModel.find({})
        res.json({ success: true, appointments })
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

//api to cancel appointment
const adminCancelAppointment = async (req,res)=>{
    try {
        const {userId,appointmentId}=req.body
        const appointmentData=await appointmentModel.findById(appointmentId)
        await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})

        // releasing doctor slot
        const {carpId,slotDate,slotTime}=appointmentData
        const carpData=await carpenterModel.findById(carpId)
        let slots_booked=carpData.slots_booked;

        slots_booked[slotDate]=slots_booked[slotDate].filter(e=>e !== slotTime)

        await carpenterModel.findByIdAndUpdate(carpId,{slots_booked})
        res.json({success:true,message:"Appointment Cancelled"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

export {addCarpenter,adminLogin,getCarpenters,adminAppointments,adminCancelAppointment} 