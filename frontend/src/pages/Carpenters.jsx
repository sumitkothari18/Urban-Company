import React , {useContext} from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
const Carpenters = () => {
  const {carpenters}=useContext(AppContext);
  const navigate=useNavigate();
  return (
    <div className='w-full grid grid-cols-auto gap-4 gap-y-6 m-3 p-3'>
      {carpenters.map((item,index)=>(
        <div onClick={() => { navigate(`/carperters/${item._id}`); scrollTo(0, 0) }} className='border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
        <img className='bg-[#EAEFFF]' src={assets.upload_area} alt="" />
        <div className='p-4'>
          <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : "text-gray-500"}`}>
            <p className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : "bg-gray-500"}`}></p><p>{item.available ? 'Available' : "Not Available"}</p>
          </div>
          <p className='text-[#262626] text-lg font-medium'>{item.name}</p>
          <p className='text-[#5C5C5C] text-sm'>Experience:{item.experience} years</p>
        </div>
      </div>
      ))}
    </div>
  )
}

export default Carpenters