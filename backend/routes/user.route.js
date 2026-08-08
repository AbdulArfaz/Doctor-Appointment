import express from 'express'
import { loginUser, logoutUser, refreshAccessToken, registerUser } from '../controllers/user.controller.js'
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


export default userRouter