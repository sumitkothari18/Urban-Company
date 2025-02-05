import React from 'react'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import {Routes,Route} from 'react-router-dom'
import Appointments from './pages/Appointments';
import AddCarpenters from './pages/AddCarpenters';
import CarpentersList from './pages/CarpentersList';
const App = () => {
  const {aToken}=useContext(AdminContext)
  return aToken? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer/>
      <Navbar/>
      <div className='flex items-start'>
      <Sidebar/>
      <Routes>
      <Route path='/' element={<></>} />
      <Route path='/all-appointments' element={<Appointments/>}/>
      <Route path='/add-carpenter' element={<AddCarpenters/>}/>
      <Route path='/carpenter-list' element={<CarpentersList/>}/>


      </Routes>
      </div>
      
    </div>
  ):
  (
    <>
    <Login/>
    <ToastContainer/>
    </>

  )
}

export default App