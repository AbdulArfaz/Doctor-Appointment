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
            required:true
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

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return 
    this.password = await bcrypt.hash(this.password,10)
    
})

userSchema.methods.isPasswordCorrect = async function(password){
   return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function (){
    return jwt.sign(
        {
            _id : this._id,
            email : this.email,
            name : this.name,
            role : this.role
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken =  function (){

  return jwt.sign(
        {
            _id : this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )

}




export const doctor = mongoose.models.doctor || mongoose.model('doctor',doctorSchema)

