import express from 'express'
import { doctorLogin, doctorsAll } from '../controllers/doctor.controller.js'
import { verifyDoctorJWT } from '../middlewares/authDoctor.middleware.js'

const doctorRouter = express.Router()

doctorRouter.get('/list',doctorsAll)

doctorRouter.post('/login',doctorLogin)
doctorRouter.use(verifyDoctorJWT)

export default doctorRouter
