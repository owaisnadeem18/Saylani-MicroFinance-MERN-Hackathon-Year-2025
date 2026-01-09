import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js"
import userRoutes from "./routes/User.routes.js"
import loanRoutes from "./routes/Loan.routes.js"
import guarantorRoutes from "./routes/Guarantor.routes.js"
import adminRoutes from "./routes/Admin.routes.js"
import cors from "cors"
import cookieParser from "cookie-parser"


const app = express() 
     
const PORT = 5000
                                                        


dotenv.config()
connectDB()                

// Now , import Routes here :

app.use(express.json())
app.use(cookieParser())

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type" , "Authorization" ],
  credentials: true,
}))

app.use("/api/user" , userRoutes)
app.use("/api/loan" , loanRoutes)
app.use("/api/guarantor" , guarantorRoutes)
app.use("/api/admin" , adminRoutes)
            
app.get(("/") , (req , res) => {
    res.send("Initialized the project")
})
                                                                                                                                                                                
app.listen(PORT , () => {
    console.log(`Server is running on ${PORT}`)
})