import express from "express"
import { getAllLoans, updateStatus } from "../controllers/Admin.controller.js"

const router = express.Router()

// Get all loans applications (for admin) view
router.get("/loans" , getAllLoans)

// Update the status of a loan application (approve or reject)
router.put("/loans/:id/status" , updateStatus)

export default router