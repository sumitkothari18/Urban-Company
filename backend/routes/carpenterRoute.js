import express from 'express'
import { carpenterList } from '../controllers/carpenterController.js';

const carpenterRouter=express.Router()

carpenterRouter.get('/list',carpenterList)

export default carpenterRouter;