import express from "express"
import cors from "cors"
import adminRouter from "./routes/admin.route.js"
import doctorRouter from "./routes/doctor.route.js"
import cookieParser from "cookie-parser"
import userRouter from "./routes/user.route.js"

const app = express()

app.use(cookieParser())

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type",'token','aToken', "Authorization","adminToken"]
}))
app.use(express.json())
app.use(express.urlencoded({extended: true,limit: "15mb"}))


app.use('/api/admin', adminRouter)

app.use('/api/doctors', doctorRouter)

app.use('/api/user', userRouter)


app.get('/', (req,res)=>{
    res.send("Api is working")
})

export { app }






