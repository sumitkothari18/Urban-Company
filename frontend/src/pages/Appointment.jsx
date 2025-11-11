import React, { useState } from 'react'
import axios from 'axios'
import { assets } from '../assets/assets'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { useContext } from 'react'
import { toast } from 'react-toastify'
const Appointment = () => {
  const navigate=useNavigate()
  const [carpInfo, setCarpInfo] = useState(false)
  const { carpId } = useParams();
  const { carpenters, currencySymbol,backendUrl,token,getCarpentersData} = useContext(AppContext)
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  const [carpSlots, setCarpSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')
  const fetchCarpInfo = () => {
    const carpInfo = carpenters.find((carp) => carp._id === carpId);
    setCarpInfo(carpInfo);
    // console.log(1);
  }

  const bookAppointment = async ()=>{
    if(!token)
    {
      toast.warn('Login to book appointment')
      navigate('/login')
    }
    try {
      const date = carpSlots[slotIndex][0].datetime
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()

        const slotDate = `${day}_${month}_${year}`
        console.log(slotDate, slotTime)
      const {data}=await axios.post(backendUrl+'/api/user/book-appointment',{carpId,slotDate,slotTime},{headers:{token}})
      if(data.success)
      {
        toast.success(data.message)
        getCarpentersData()
        navigate('/my-appointment')
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  const getAvailableSlots = async () => {
    setCarpSlots([]);

    let today = new Date();
    for (let i = 0; i < 7; i++) {
      // getting date with index 
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      console.log(currentDate)
      // setting end time of the date with index
      let endTime = new Date();
      endTime.setDate(today.getDate() + i)
      endTime.setHours(18, 0, 0, 0)

      // setting hours 
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
         currentDate.setMinutes(currentDate.getMinutes() > 0 ? 0 : 0)
      }
      else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }
      let timeSlots = []
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        let day = currentDate.getDate()
        let month = currentDate.getMonth() + 1
        let year = currentDate.getFullYear()
        const slotDate = `${day}_${month}_${year}`
        const slotTime=formattedTime

        const isSlotAvailable=carpInfo.slots_booked[slotDate] && carpInfo.slots_booked[slotDate].includes(slotTime) ? false:true
        // add slot to array
        if(isSlotAvailable){
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime
        })
      }
        // increment time by 60 mins
        currentDate.setMinutes(currentDate.getMinutes() + 60)
      }
      setCarpSlots(prev => ([...prev, timeSlots]))
      console.log(timeSlots)
    }
  }

  useEffect(() => {
    if (carpenters.length > 0)
      fetchCarpInfo();
  }, [carpenters, carpId])

  useEffect(() => {
    if (carpInfo) {
      getAvailableSlots();
    }
  }, [carpInfo])


  return carpInfo ? (
    <div>
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={assets.upload_area} alt="" />
        </div>
        <div className='flex-1 border border-[#ADADAD] rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>

          {/* ----- Carpenter Info : name,experience ----- */}

          <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{carpInfo.name} <img className='w-5' src={assets.verified_icon} alt="" /></p>
          <div className='flex items-center gap-2 mt-1 text-gray-600'>
            <p>{carpInfo.expertise}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{carpInfo.experience}</button>
          </div>
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>
              About <img className='w-3' src={assets.info_icon} alt="" />
            </p>
            <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{carpInfo.about}</p>
          </div>

          <p className='text-gray-500 font-medium mt-4'>
            Appointment fee: <span className='text-gray-600'>{currencySymbol}{carpInfo.fees}</span>
          </p>
        </div>
      </div>

      {/* slots */}
      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p>Booking slots</p>
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {carpSlots.length && carpSlots.map((item, index) => (
            <div onClick={() => setSlotIndex(index)}
              key={index}
              className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'}`}
            >
              <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
              <p>{item[0] && item[0].datetime.getDate()}</p>
            </div>
          ))}
        </div>

        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {carpSlots.length && carpSlots[slotIndex].map((item, index) => (
            <p
              onClick={() => setSlotTime(item.time)}
              key={index}
              className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'}`}
            >
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>

        <button
          onClick={bookAppointment}
          className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6'
        >
          Book an appointment
        </button>

      </div>
    </div>

  ) : null
}

export default Appointment