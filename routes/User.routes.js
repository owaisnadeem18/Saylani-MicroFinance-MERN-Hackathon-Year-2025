import express from "express"

// Now , import Controller functions from User.controller.js file:
import { registerUser } from "../controllers/User.controller.js"


const router = express.Router()

// route # 01 of User Registration API:
router.post("/register" , registerUser)