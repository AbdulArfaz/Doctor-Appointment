import express from 'express'
import { doctorsAll } from '../controllers/doctor.controller.js'

const doctorRouter = express.Router()

doctorRouter.get('/list',doctorsAll)

export default doctorRouter
