import express from "express"
import cors from "cors"
import adminRouter from "./routes/admin.route.js"
// import cookieParser from "cookie-parser"

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true,limit: "15mb"}))
// app.use(cookieParser())
app.use(cors({
    origin: '*',
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization","adminToken"]
}))


app.use('/api/admin',adminRouter)
//localhost:4000/api/admin

app.get('/', (req,res)=>{
    res.send("Api is working")
})



export {app}





// app.use(express.static("public"))
