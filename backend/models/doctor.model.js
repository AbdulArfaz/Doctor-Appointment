import mongoose, {Schema} from 'mongoose'
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const doctorSchema = new Schema({
        name:{
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },
        email:{
             type: String,
            required: true,
            unique:true
        },
        password:{
             type: String,
            required: [true, "Password is required"]
        },
        image:{
             type: String,
            required:true
        },
        speciality:{
             type: String,
            required:true
        },
        degree:{
            type: String,
            required:true
        },
        experience:{
            type: String,
            required:true
        },
        about:{
            type: String,
            required:true
        },
        available:{
            type: Boolean,
            required:true,
            default:true
        },
        fees:{
            type:Number,
            required:true
        },
        address:{
            type:Object,
            required:true
        },
        date:{
            type:Number,
            required:true
        },
        slots_booked:{
            type:Object,
            default:{}
        }

},{ minimize: true},{ timestamps: true})

doctorSchema.pre("save", async function(next){
    if(!this.isModified("password")) return 
    this.password = await bcrypt.hash(this.password,10)
    
})

doctorSchema.methods.isPasswordCorrect = async function(password){
   return await bcrypt.compare(password,this.password)
}

doctorSchema.methods.generateAccessToken = function (){
    return jwt.sign(
        {
            _id : this._id,
            email : this.email,
            name : this.name,
            role : this.role
        },
        process.env.DOCTOR_ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.DOCTOR_ACCESS_TOKEN_EXPIRY
        }
    )
}

doctorSchema.methods.generateRefreshToken =  function (){

  return jwt.sign(
        {
            _id : this._id,
        },
        process.env.DOCTOR_REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.DOCTOR_REFRESH_TOKEN_EXPIRY
        }
    )

}




export const Doctor = mongoose.models.Doctor || mongoose.model('Doctor',doctorSchema)

