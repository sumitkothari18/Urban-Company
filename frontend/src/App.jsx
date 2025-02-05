import React from 'react'
import { Route,Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Carpenters from './pages/Carpenters';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Appointment from './pages/Appointment';
import MyAppointment from './pages/MyAppointment';
const App = () => {
  return (
    <div >
      <ToastContainer/>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/carpenters' element={<Carpenters/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/carperters/:carpId' element={<Appointment/>}/>
        <Route path='/my-appointment' element={<MyAppointment/>}/>



        
      </Routes>
      
    </div>
  )
}

export default App