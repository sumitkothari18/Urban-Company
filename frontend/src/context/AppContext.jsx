import { createContext, useState,useEffect } from "react";
// import {carpenters} from '../assets/assets.js'
import axios from 'axios'
import {toast} from 'react-toastify'
export const AppContext = createContext()

const AppContextProvider = (props) => {

    const currencySymbol = '$'
    const [carpenters,setCarpenters]=useState([])
    const backendUrl=import.meta.env.VITE_BACKEND_URL
    const [token,setToken]=useState(localStorage.getItem('token')?localStorage.getItem('token'):'')
    const getCarpentersData= async ()=>{
        try {
            const {data}=await axios.get(backendUrl+'/api/carpenter/list')
            if(data.success)
            {
                setCarpenters(data.carpenters)
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            
        }
    }
    const value = {
        carpenters,
        currencySymbol,token,setToken,backendUrl,getCarpentersData
    }
    useEffect(() => {
      getCarpentersData()
    }, [])
    
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider