import express from 'express'
import { doctorAppointments, doctorLogin, doctorsAll } from '../controllers/doctor.controller.js'
import { verifyDoctorJWT } from '../middlewares/authDoctor.middleware.js'

const doctorRouter = express.Router()

doctorRouter.get('/list',doctorsAll)

doctorRouter.post('/login',doctorLogin)
// doctorRouter.use(verifyDoctorJWT)
doctorRouter.get('/appointments',verifyDoctorJWT,doctorAppointments)

export default doctorRouter
