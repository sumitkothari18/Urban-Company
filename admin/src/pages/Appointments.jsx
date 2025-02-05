import React from 'react'
import { useContext,useEffect } from 'react'
import { AdminContext } from '../context/AdminContext'
import {assets} from '../assets/assets'
import { AppContext } from '../context/AppContext'
const Appointments = () => {
  const {aToken,appointment,getAllAppointments,cancelAppointment}=useContext(AdminContext)
  const {currency,slotDateFormat}=useContext(AppContext)
  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])
  
  return (
    <div className='w-full max-w-6xl m-5 '>

    <p className='mb-3 text-lg font-medium'>All Appointments</p>

    <div className='bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll'>
      <div className='hidden sm:grid grid-cols-[0.5fr_2fr_1fr_3fr_3fr_1fr] grid-flow-col py-3 px-6 border-b'>
        <p>#</p>
        <p>Client</p>
        <p>Date & Time</p>
        <p>Carpenter</p>
        <p>Fees</p>
        <p>Action</p>
      </div>
      {appointment.map((item, index) => (
        <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_2fr_1fr_3fr_3fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50' key={index}>
          <p className='max-sm:hidden'>{index+1}</p>
          <div className='flex items-center gap-2'>
            <img src={item.userData.image} className='w-8 rounded-full' alt="" /> <p>{item.userData.name}</p>
          </div>
          
          <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
          <div className='flex items-center gap-2'>
            <img src={assets.upload_area1} className='w-8 rounded-full bg-gray-200' alt="" /> <p>{item.carpData.name}</p>
          </div>
          <p>{currency}{item.amount}</p>
          {item.cancelled ? <p className='text-red-400 text-xs font-medium'>Cancelled</p> : item.isCompleted ? <p className='text-green-500 text-xs font-medium'>Completed</p> : <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />}
        </div>
      ))}
    </div>

  </div>
  )
}

export default Appointments