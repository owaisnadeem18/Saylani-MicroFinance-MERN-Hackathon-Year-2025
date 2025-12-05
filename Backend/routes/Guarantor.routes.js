import express from "express"
import { guarantorsInfo } from "../controllers/Guarantor.controller.js"
import { authMiddleware } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/" , authMiddleware , guarantorsInfo)

export default router