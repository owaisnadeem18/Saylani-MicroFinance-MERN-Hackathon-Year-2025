import express from "express"
import { guarantorsInfo } from "../controllers/Guarantor.controller.js"

const router = express.Router()

router.post("/" , guarantorsInfo)

export default router