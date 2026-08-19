import express from 'express'
import { appointmentCancel, appointmentComplete, changeAvailability, doctorAppointments, doctorDashboard, doctorLogin, doctorProfile, doctorsAll, updateDoctorProfile } from '../controllers/doctor.controller.js'
import { verifyDoctorJWT } from '../middlewares/authDoctor.middleware.js'
import { upload } from '../../backend/middlewares/multer.middleware.js'

const doctorRouter = express.Router()

doctorRouter.get('/list',doctorsAll)

doctorRouter.post('/login',doctorLogin)
doctorRouter.get('/appointments',verifyDoctorJWT,doctorAppointments)
doctorRouter.post('/complete-appointment',verifyDoctorJWT,appointmentComplete)
doctorRouter.post('/cancel-appointment',verifyDoctorJWT,appointmentCancel)
doctorRouter.post('/change-availability',changeAvailability)
doctorRouter.get('/doc-dashboard',verifyDoctorJWT,doctorDashboard)
doctorRouter.get('/doctor-profile',verifyDoctorJWT,doctorProfile)
doctorRouter.post('/update-profile',verifyDoctorJWT, upload.single('image'), updateDoctorProfile)

export default doctorRouter
