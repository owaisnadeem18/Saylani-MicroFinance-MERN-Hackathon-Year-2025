// Admin Controller

// 1️⃣ Get all loan applications (for admin view)
// 2️⃣ Update the status of a loan application (approve or reject)


// ----------------------------------------------------------------------- 1 ---------------------------------------------------------------------

// Get all loans (Get Request)

import Loan from "../models/Loan.model.js";

export const getAllLoans = async (req , res) => {
  
    try {

        // We have to get all the loans whose are present in the DB: 

        const loans = await Loan.find().sort({createdAt: -1})

        if (loans.length == 0) {
            return res.status(200).json({
                success: true ,
                message: "No Loans Application ! "       
            })
        }

        return res.status(200).json({
            success: true,
            totalApplications: loans.length,
            loans
        })

    }

    catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: err.message
        })
    }
} 


// ----------------------------------------------------------------------- 2 ---------------------------------------------------------------------

export const updateStatus = async (req , res) => {
    
    try {
        // 1. Here , we have to first get the Loan Id for updating the status:

        const loanId = req.params.id 
        
        const {status} = req.body

        // 2. Validation Steps:
        if (!status || !["approved" , "rejected"].includes(status.toLowerCase())) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid status: 'approved' or 'rejected'"
            })
        }

        // 3. Now, we have to find either the loan application present in the DB or not: 

        const loan = await Loan.findById(loanId)

        if (!loan) {
             return res.status(404).json({
                message: "Loan Application Does not exist",
                success: false
             })
        } 

        // 4. Now update the status , which admin entered: 

        loan.status = status.toLowerCase()

        await loan.save()

        // 5. Now, we have to send success status , after all this: 

        return res.status(200).json({
            message: `Loan Application ${loan.status}`,
            success: true,
            loanId: loan._id,
            status: loan.status
        })
    
    
    }

    catch (err) {
        return res.status(500).json({
            message: "Internal Server Error" ,
            success: false,
            error: err.message
        })
    }
}
