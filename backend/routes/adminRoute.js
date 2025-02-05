import express from 'express'
import { addCarpenter , adminAppointments, adminCancelAppointment, adminLogin, getCarpenters } from '../controllers/adminController.js'
import {changeAvailability} from '../controllers/carpenterController.js'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js'
const adminRouter=express.Router()

adminRouter.post('/add-carpenter',authAdmin,upload.single(),addCarpenter)
adminRouter.post('/login',adminLogin)
adminRouter.post('/get-allCarpenters',authAdmin,getCarpenters)
adminRouter.post('/change-availability',authAdmin,changeAvailability)
adminRouter.get('/appointments',authAdmin,adminAppointments)
adminRouter.post('/cancel-appointment',adminCancelAppointment)




export default adminRouter;