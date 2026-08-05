import express from "express"
import cors from "cors"
import adminRouter from "./routes/admin.route.js"

const app = express()

app.use(express.json())
app.use(cors({
    origin: '*',
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))


app.use('/api/admin',adminRouter)
//localhost:4000/api/admin

app.get('/', (req,res)=>{
    res.send("Api is working")
})



export {app}



// import cookieParser from "cookie-parser"
// app.use(express.json({limit: "15mb"}))
// app.use(express.urlencoded({extended: true,limit: "15mb"}))
// app.use(express.static("public"))
// app.use(cookieParser())