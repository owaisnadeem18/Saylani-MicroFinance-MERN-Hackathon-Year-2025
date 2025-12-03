import express from "express"

// Now , import Controller functions from User.controller.js file:
import { getUserDetails, loginUser, registerUser, updateUserPassword } from "../controllers/User.controller.js"

const router = express.Router()

// route # 01 of User Registration API:
router.post("/register" , registerUser)

// route # 02 of User Login: 
router.post("/login" , loginUser)

// route # 03 of user details fetching will be here:
router.get("/:userId" , getUserDetails)

// route # 04 of updating user password API:
router.put("/:userId/change-password" , updateUserPassword)

export default router                   