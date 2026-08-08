import express from "express"
import cors from "cors"
import adminRouter from "./routes/admin.route.js"
import doctorRouter from "./routes/doctor.route.js"
import cookieParser from "cookie-parser"
import userRouter from "./routes/user.route.js"

const app = express()

app.use(cookieParser())
app.use(cors({
    origin: '*',
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type",'aToken', "Authorization","adminToken"]
}))
app.use(express.json())
app.use(express.urlencoded({extended: true,limit: "15mb"}))


app.use('/api/admin', adminRouter)
//localhost:4000/api/admin

app.use('/api/doctors', doctorRouter)

app.use('/api/user', userRouter)


app.get('/', (req,res)=>{
    res.send("Api is working")
})

export { app }





// app.use(express.static("public"))
