import express from "express"
import { applyForLoan } from "../controllers/Loan.controller"

const router = express.Router()

// route of Apply for loan (category: Qarz e Hasana) API

router.post("/apply" , applyForLoan)

export default router