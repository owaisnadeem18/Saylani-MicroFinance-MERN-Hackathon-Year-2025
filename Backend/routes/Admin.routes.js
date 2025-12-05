import express from "express"
import { generateQRcode, getAllLoans, updateStatus } from "../controllers/Admin.controller.js"

const router = express.Router()

// ----------------------------------------------------------------------------------------- 1 ----------------------------------------------------------------------------
// Get all loans applications (for admin) view
router.get("/loans" , getAllLoans)

// ----------------------------------------------------------------------------------------- 2 ----------------------------------------------------------------------------
// Update the status of a loan application (approve or reject)
router.put("/loans/:id/status" , updateStatus)

// ----------------------------------------------------------------------------------------- 3 ----------------------------------------------------------------------------
router.post("/loans/:id/qrcode" , generateQRcode)

export default router