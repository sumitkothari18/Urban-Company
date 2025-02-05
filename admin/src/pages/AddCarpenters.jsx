import axios from 'axios'
import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import { AdminContext } from '../context/AdminContext'

const AddCarpenters = () => {
    const [name, setName] = useState('')
    const [experience, setExperience] = useState('1 Year')
    const [fees, setFees] = useState('')
    const [about, setAbout] = useState('')
    const [phone,setPhone]=useState('')
    const [expertise,setExpertise]=useState('')
    const [age,setAge]=useState('')

    const {aToken,backendUrl}=useContext(AdminContext);

    const onSubmitHandler= async  (event) =>{
        event.preventDefault();
        try {
            const formdata=new FormData();
            formdata.append('name',name)
            formdata.append('experience',experience)
            formdata.append('fees',Number(fees))
            formdata.append('age',Number(age))
            formdata.append('about',about)
            formdata.append('mobile',phone)
            formdata.append('expertise',expertise)

            // console log  form data
            formdata.forEach((value, key) => {
                console.log(`${key}: ${value}`);
            });

            const {data}= await axios.post(backendUrl+'/api/admin/add-carpenter',formdata,{headers:{aToken}})
            if(data.success)
            {
                toast.success(data.message);
                setName('')
                setAbout('')
                setExperience('')
                setExpertise('')
                setPhone('')
                setFees('')
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

  return (
    <form onSubmit={onSubmitHandler} className='m-5 w-full'>

            <p className='mb-3 text-lg font-medium'>Add Doctor</p>

            <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
                <div className='flex items-center gap-4 mb-8 text-gray-500'>
                    {/* <label htmlFor="doc-img">
                        <img className='w-16 bg-gray-100 rounded-full cursor-pointer' src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e) => setDocImg(e.target.files[0])} type="file" name="" id="doc-img" hidden /> */}
                    {/* <p>Upload doctor <br /> picture</p> */}
                </div>

                <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>

                    <div className='w-full lg:flex-1 flex flex-col gap-4'>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Your name</p>
                            <input onChange={e => setName(e.target.value)} value={name} className='border rounded px-3 py-2' type="text" placeholder='Name' required />
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Phone</p>
                            <input onChange={e => setPhone(e.target.value)} value={phone} className='border rounded px-3 py-2' type="number" placeholder='Phone' required />
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Age</p>
                            <input onChange={e => setAge(e.target.value)} value={age} className='border rounded px-3 py-2' type="number" placeholder='Age' required />
                        </div>
                        
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Experience</p>
                            <select onChange={e => setExperience(e.target.value)} value={experience} className='border rounded px-2 py-2' >
                                <option value="1 Year">1 Year</option>
                                <option value="2 Year">2 Years</option>
                                <option value="3 Year">3 Years</option>
                                <option value="4 Year">4 Years</option>
                                <option value="5 Year">5 Years</option>
                                <option value="6 Year">6 Years</option>
                                <option value="8 Year">8 Years</option>
                                <option value="9 Year">9 Years</option>
                                <option value="10 Year">10 Years</option>
                                <option value="11 Year">11 Years</option>
                                <option value="12 Year">12 Years</option>
                                <option value="13 Year">13 Years</option>
                                <option value="14 Year">14 Years</option>
                                <option value="15 Year">15 Years</option>
                                <option value="16 Year">16 Years</option>
                                <option value="17 Year">17 Years</option>
                                <option value="18 Year">18 Years</option>
                                <option value="19 Year">19 Years</option>
                                <option value="20 Year">20 Years</option>
                                <option value="21 Year">21 Years</option>
                                <option value="22 Year">22 Years</option>
                                <option value="23 Year">23 Years</option>

                            </select>
                        </div>


                        {/* <div className='flex-1 flex flex-col gap-1'>
                            <p>Set Password</p>
                            <input onChange={e => setPassword(e.target.value)} value={password} className='border rounded px-3 py-2' type="password" placeholder='Password' required />
                        </div> */}

                        <div className='flex-1 flex flex-col gap-1'>
                        <p>Expertise</p>
                        <input onChange={e => setExpertise(e.target.value)} value={expertise} className='border rounded px-3 py-2' type="text" placeholder='Expertise' required />
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Fees</p>
                            <input onChange={e => setFees(e.target.value)} value={fees} className='border rounded px-3 py-2' type="number" placeholder='Carpenter fees' required />
                        </div>

                    </div>
                </div>

                <div>
                    <p className='mt-4 mb-2'>About Carpenter</p>
                    <textarea onChange={e => setAbout(e.target.value)} value={about} className='w-full px-4 pt-2 border rounded' rows={5} placeholder='write about carpenter'></textarea>
                </div>

                <button type='submit' className='bg-primary px-10 py-3 mt-4 text-white rounded-full'>Add Carpeneter</button>

            </div>


        </form>
  )
}

export default AddCarpenters