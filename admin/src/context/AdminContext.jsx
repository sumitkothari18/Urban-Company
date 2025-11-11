import { useState, } from "react";
import { createContext } from "react";
import axios from 'axios'
import { toast } from 'react-toastify'
export const AdminContext = createContext()

const AdminContextProvider = (props) => {

    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '')
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [carpenters, setCarpenters] = useState([])
    const [appointment, setAppointment] = useState([])
    const getallCarpenters = async () => {
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/get-allCarpenters', {}, { headers: { aToken } })
            if (data.success) {
                setCarpenters(data.carpenters)
                console.log(data.carpenters);

            }
            else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            res.json({ success: false, message: error.message })
        }
    }
    const changeAvailability = async (carpId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/change-availability', { carpId }, { headers: { aToken } })
            if (data.success) {
                toast.success(data.message)
                getallCarpenters()
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            res.json({ success: false, message: error.message })
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {

            const { data } = await axios.post(backendUrl + '/api/admin/cancel-appointment', { appointmentId })
            if (data.success) {
                toast.success(data.message)
                getAllAppointments()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            res.json({ success: false, message: error.message })
        }
    }

    const getAllAppointments = async () => {

        try {

            const { data } = await axios.get(backendUrl + '/api/admin/appointments', { headers: { aToken } })
            if (data.success) {
                setAppointment(data.appointments.reverse())
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }
    const value = {
        aToken, setAToken, backendUrl, carpenters, getallCarpenters, changeAvailability, getAllAppointments, appointment, cancelAppointment
    }
    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider