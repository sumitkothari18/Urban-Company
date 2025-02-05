import React, { useContext,useState, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
const MyAppointment = () => {
    const {backendUrl,token,getCarpentersData}=useContext(AppContext)
    const [appointment,setAppointment]=useState([])
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Function to format the date eg. ( 20_01_2000 => 20 Jan 2000 )
    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_')
        return dateArray[0] + " " + months[Number(dateArray[1])-1] + " " + dateArray[2]
    }

    const cancelAppointment = async (appointmentId)=>{
        try {
             const {data}=await axios.post(backendUrl+'/api/user/cancel-appointment',{appointmentId},{headers:{token,}})
             if(data.success)
             {
                toast.success(data.message)
                getUserAppointments()
                getCarpentersData()
             }
             else{
                toast.error(data)
             }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const getUserAppointments = async ()=>{
        try {
            const {data}=await axios.get(backendUrl+'/api/user/get-appointments',{headers:{token}})
            if(data.success)
            {
                setAppointment(data.appointments.reverse())

            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    useEffect(()=>{
        if(token)
        {
            getUserAppointments()
        }
    },[token])
  return (
    <div>
    <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My appointments</p>
    <div className=''>
        {appointment.map((item, index) => (
            <div key={index} className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b'>
                <div>
                    <img className='w-32 bg-indigo-50' src={assets.upload_area} alt="" />
                </div>
                <div className='flex-1 text-sm text-zinc-600'>
                    <p className='text-neutral-800 font-semibold'>{item.carpData.name}</p>
                    <p>{item.carpData.expertise}</p>
                    <p className='text-xs mt-1'><span className='text-sm text-neutral-700 font-medium'>Date & Time:</span> {slotDateFormat(item.slotDate)} |  {item.slotTime}</p>
                </div>
                <div></div>
                <div className='flex flex-col gap-2 justify-end'>
                    {/* <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'>Pay Online</button> */}
                    {!item.cancelled && <button onClick={()=>cancelAppointment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'>Cancel appointment</button>} 
                    {item.cancelled && <button onClick={()=>cancelAppointment(item._id)} className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Cancelled</button>}
                </div>
            </div>
        ))}
    </div>
</div>
  )
}

export default MyAppointment