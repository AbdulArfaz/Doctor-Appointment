import {asyncHandler} from '../utils/asyncHandler.js'
import {Doctor} from '../models/doctor.model.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'



const changeAvailability = asyncHandler(async(req,res)=>{

const {docId} = req.body
const docData = await Doctor.findById(docId)
if (!docData) {
    throw new ApiError(404,"Doctor not found")
}
const updateDocAvail = await Doctor.findByIdAndUpdate(docId,{available: !docData.available},{returnDocument: 'after'})
return res.status(200)
.json(new ApiResponse(200, updateDocAvail, "Avaialablility changed successfully"))

})


const doctorsAll = asyncHandler(async(req,res)=>{
    const doctors = await Doctor.find({}).select('-password -email')
    if(!doctors){
        throw new ApiError(400,'Doctors data not found')
    }
    return res.status(200)
    .json(new ApiResponse(200,doctors,"get all doctors successfully"))
})

export {changeAvailability,doctorsAll}



