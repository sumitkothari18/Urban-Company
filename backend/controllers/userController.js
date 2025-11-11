import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken'
import carpenterModel from '../models/carpenterModel.js';
import appointmentModel from '../models/AppointmentModel.js';
//api to register user
const registerUser = async (req,res) =>{
    try {
        const {name,email,password,phone}=req.body;
        if(!name || !password || !email || !phone)
        {
            return res.json({success:false,message:"Details Missing"})
        }

        if(password.length < 8)
        {
            return res.json({success:false,message:"Enter a strong password"})
        }
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt)

        const userData={
            name,
            email,
            password:hashedPassword,
            phone
        }

        const newUser=new userModel(userData);
        const user=await newUser.save()

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
        res.json({success:true,token});


    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
}

const login = async (req,res)=>{
    try {
        const {email,password}=req.body
        const user=await userModel.findOne({email})
        if(!user)
        {
            return res.json({success:false,message:"User does not exist"})
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(isMatch)
        {
            const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
            return res.json({success:true,token})
        }
        else{
            res.json({success:false,message:"Invalid Credentials"})
        }
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

// api to book appointment 

const bookAppointment = async (req,res) =>{
    try {
        const {userId,carpId,slotDate,slotTime}=req.body
        const carpData=await carpenterModel.findById(carpId)
        if(!carpData.available)
        {
            return res.json({success:false,message:"Carpenter not available"})
        }
        let slots_booked=carpData.slots_booked

        // checking for slots availability

        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: 'Slot Not Available' })
            }
            else {
                slots_booked[slotDate].push(slotTime)
            }
        } else {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

        const userData=await userModel.findById(userId).select('-password')
        delete carpData.slots_booked;
        const appointmentData={
            userId,
            carpId,
            userData,
            carpData,
            amount:carpData.fees,
            slotDate,
            slotTime,
            date:Date.now()
        }

        const newAppointment=new appointmentModel(appointmentData);
        await newAppointment.save()

        // save new slots in carp data
        await carpenterModel.findByIdAndUpdate(carpId,{slots_booked})
       return res.json({success:true , message:"Appointment Booked"})
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

//api to get appointments 
const getAppointments = async (req,res)=>{
    try {
        const {userId}=req.body
        const appointments=await appointmentModel.find({userId});
        res.json({success:true,appointments})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

// api to cancel appointment
const cancelAppointment= async (req,res)=>{
    try {
        const {userId,appointmentId}=req.body
        const appointmentData=await appointmentModel.findById(appointmentId)
        if(appointmentData.userId !== userId)
        {
            return res.json({success:false,message:"Unauthorized Action"})
        }
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
export {registerUser,login,bookAppointment,getAppointments,cancelAppointment}