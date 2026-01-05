import express from "express"
import { generateQRcode, getAllLoans, updateStatus } from "../controllers/Admin.controller.js"
import { adminMiddleware } from "../middleware/adminMiddleware.js"
import { authMiddleware } from "../middleware/authMiddleware.js"

const router = express.Router()

// ----------------------------------------------------------------------------------------- 1 ----------------------------------------------------------------------------
// Get all loans applications (for admin) view
router.get("/admin/loans" , authMiddleware , adminMiddleware , getAllLoans)

// ----------------------------------------------------------------------------------------- 2 ----------------------------------------------------------------------------
// Update the status of a loan application (approve or reject)
router.put("/admin/loans/:id/status" , authMiddleware , adminMiddleware , updateStatus)
// ----------------------------------------------------------------------------------------- 3 ----------------------------------------------------------------------------
router.post("/admin/loans/:id/qrcode" , authMiddleware , adminMiddleware , generateQRcode)
                                                                              
export default router    
