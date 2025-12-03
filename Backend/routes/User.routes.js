import express from "express"

// Now , import Controller functions from User.controller.js file:
import { loginUser, registerUser } from "../controllers/User.controller.js"


const router = express.Router()

// route # 01 of User Registration API:
router.post("/register" , registerUser)

// route # 02 of User Login: 
router.post("/login" , loginUser)

export default router