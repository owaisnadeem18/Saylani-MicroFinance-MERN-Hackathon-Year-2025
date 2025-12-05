import express from "express"
import { applyForLoan } from "../controllers/Loan.controller.js"
import { getUserLoanRequests } from "../controllers/Loan.controller.js"
import { authMiddleware } from "../middleware/authMiddleware.js"
import { userAuthentication } from "../middleware/userAuthorization.js"

const router = express.Router()

// route of Apply for loan (category: Qarz e Hasana) API

router.post("/apply" , authMiddleware , applyForLoan)
router.get("/getLoanRequests/:userId" , authMiddleware , userAuthentication , getUserLoanRequests)
                                                                                                                                                               
export default router