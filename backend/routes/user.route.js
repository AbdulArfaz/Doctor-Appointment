import express from 'express'
import { getUserProfile, loginUser, logoutUser, refreshAccessToken, registerUser, updateUserProfile } from '../controllers/user.controller.js'
import { upload } from '../middlewares/multer.middleware.js'
import { user } from '../models/user.model.js'
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


export default userRouter