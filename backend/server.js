import {app}  from './app.js'
import dotenv from 'dotenv'
import connectDB from './db/mongodb.js'
import uploadOnCloudinary from './db/cloudinary.js'


dotenv.config({
    path: './.env'
})

const port = process.env.PORT || 4000

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 4000, ()=>{
        console.log(`Server is running at port : ${process.env.PORT}`);
        
    })
}) 
.catch((err)=>{
    console.log("MONGO db connection failed !!", err);
    
})










