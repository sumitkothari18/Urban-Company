import express from 'express'
import { bookAppointment, cancelAppointment, getAppointments, login, registerUser } from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';

const userRouter=express.Router();

userRouter.post('/register',registerUser)
userRouter.post('/login',login )
userRouter.post('/book-appointment',authUser,bookAppointment)
userRouter.post('/cancel-appointment',authUser,cancelAppointment)
userRouter.get('/get-appointments',authUser,getAppointments)

export default userRouter