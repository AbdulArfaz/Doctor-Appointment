
import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'

const addDoctor = asyncHandler (async (req,res)=>{
    
    const {name,email,password,speciality,degree,experience,about,fees,address} = req.body
    const imageFile = req.file
      if(
        [name,email,password,speciality,degree,experience,about,fees,address].some(field => !field || (typeof field === "string" && !field.trim())))
        {
          throw new ApiError(400, "All fields are compulsory") 
        }
        
        


         
})

export {addDoctor}