
import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import validator from 'validator'
import { Doctor } from '../models/doctor.model.js'
import uploadOnCloudinary  from '../db/cloudinary.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { Admin } from '../models/admin.model.js'
import { Appointment } from '../models/appointment.model.js'

const addDoctor = asyncHandler (async (req,res)=>{
    
    const {name,email,password,speciality,degree,experience,about,fees,address} = req.body
    const imageFile = req.file
      if(
        [name,email,password,speciality,degree,experience,about,fees,address].some(field => !field || (typeof field === "string" && !field.trim())))
        {
          throw new ApiError(400, "All fields are compulsory") 
        }
      if(!validator.isEmail(email)){
        throw new ApiError(400, "Please enter a valid email")
      }
      if(password.length < 8){
         throw new ApiError(400, "Please enter a strong password of 8 characters")
      }

       const existedDoctor = await Doctor.findOne({
        $or: [{name}, {email}]
     })
        if(existedDoctor){
            throw new ApiError(409, "Doctor with name and email already exists")
        }

       const imageLocalPath = req.file?.path
       if (!imageLocalPath) {
        throw new ApiError(400, "Doctor image file is required")
       } 
     const imageUpload = await uploadOnCloudinary(imageLocalPath)
     if (!imageUpload) {
        throw new ApiError(500, "Failed to upload image to cloudinary")
     }


      const doctorData = await Doctor.create({
        name,
        image : imageUpload.url,
        email,
        password,
        speciality,
        degree,
        experience,
        about,
        fees,
        address:typeof address === "string" ? JSON.parse(address) : address,
        date:Date.now()
     })

    console.log("New Doctor created successfully: ", doctorData);
    
      return res.status(201).json(
        new ApiResponse(200, doctorData, "Doctor added successfully")
     )
})



const loginAdmin = asyncHandler(async (req,res)=>{

      const {email,password} = req.body
    if(!password && !email){
        throw new ApiError(400,"Email and password are required")
    }
 
    const admin = await Admin.findOne({ email })
    if(!admin) {
      throw new ApiError(404,"Admin account not found")
    }

    const isPasswordValid = await admin.isPasswordCorrect(password)
    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid admin credentials")
    }
    const accessToken = admin.generateAccessToken()
     const options = {
      httpOnly: true,
      secure: true
     }
     console.log(`Admin logged in Successfully: , ${admin.email}`);
     

     return res
     .status(200)
     .cookie("accessToken", accessToken, options)
     .json(
      new ApiResponse(
        200,
        {
          accessToken,
          admin: {
            _id: admin._id,
            name: admin.name,
            email: admin.email,
            role: admin.role
          }
        },
        "Admin Logged in sucessfully"
      )
     )
})



const allDoctorsList = asyncHandler(async(req,res)=>{

  const doctors = await Doctor.find({}).select('-password')
  
  return res
  .status(200)
  .json(new ApiResponse(200, doctors, "Doctor data fetch successfully"))
})

export const appointmentsAdmin = asyncHandler(async (req, res) => {
    const appointments = await Appointment.find({})
    res.json({ success: true, appointments })
})

export {addDoctor,loginAdmin,allDoctorsList}