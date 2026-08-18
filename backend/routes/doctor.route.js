import express from 'express'
import { appointmentCancel, appointmentComplete, doctorAppointments, doctorDashboard, doctorLogin, doctorsAll } from '../controllers/doctor.controller.js'
import { verifyDoctorJWT } from '../middlewares/authDoctor.middleware.js'

const doctorRouter = express.Router()

doctorRouter.get('/list',doctorsAll)

doctorRouter.post('/login',doctorLogin)
// doctorRouter.use(verifyDoctorJWT)
doctorRouter.get('/appointments',verifyDoctorJWT,doctorAppointments)
doctorRouter.post('/complete-appointment',verifyDoctorJWT,appointmentComplete)
doctorRouter.post('/cancel-appointment',verifyDoctorJWT,appointmentCancel)
doctorRouter.get('/doc-dashboard',verifyDoctorJWT,doctorDashboard)

export default doctorRouter
