import jwt from 'jsonwebtoken'
import { asyncHandler } from '../utils/asyncHandler.js'
import { Admin } from '../models/admin.model.js'
import { ApiError } from '../utils/ApiError.js'


const authAdmin = asyncHandler(async (req,res,next)=>{
    try {
         const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
   if(!token){
    throw new ApiError(401, "Unauthorized request")
   }

   const decodedToken = jwt.verify(token, process.env.ADMIN_ACCESS_TOKEN_SECRET)
    
    const admin = await Admin.findById(decodedToken?._id).select("-password")
    if(!admin){
        throw new ApiError(401,"Invalid Access Token: Admin Not Found")
    }

    req.admin = admin
    next()


}catch(error){
 throw new ApiError(401, error?.message || "Invalid Access Token")
}
    

})

export default authAdmin