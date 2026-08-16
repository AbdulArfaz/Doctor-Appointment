import express from 'express'
import { bookAppointment, cancelAppointment, getUserProfile, loginUser, logoutUser, myAppointments, paymentRazorpay, refreshAccessToken, registerUser, updateUserProfile, verifyRazorpay } from '../controllers/user.controller.js'
import { upload } from '../middlewares/multer.middleware.js'
import { User } from '../models/user.model.js'
import {verifyJWT} from '../middlewares/authUser.middleware.js'


const userRouter = express.Router()

userRouter.get('/test',(req,res)=>{
    res.send('user router is working')
})

userRouter.post('/register',upload.single('image'), registerUser)
userRouter.post('/login', loginUser)
userRouter.route("/logout").post(verifyJWT, logoutUser)
userRouter.route("/refreshToken").post(refreshAccessToken)

userRouter.get('/get-profile',verifyJWT,getUserProfile)
userRouter.put('/update-profile', verifyJWT,upload.single('image'),updateUserProfile)
userRouter.post('/book-appointment', verifyJWT,bookAppointment)
userRouter.get('/appointments',verifyJWT,myAppointments)
userRouter.post('/cancel-appointment',verifyJWT,cancelAppointment)
userRouter.post('/payment-razorpay',verifyJWT,paymentRazorpay)
userRouter.post('/verify-razorpay',verifyJWT,verifyRazorpay)


export default userRouter