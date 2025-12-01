// This is the Guarantor API
// Question. Where we will use this one in our frontend application: 
// Ans. When user will apply for loan , another form will open to collect the info about two of the guarantors:

import Guarantor from "../models/Guarantor.model.js"
import Loan from "../models/Loan.model.js"

// two gurantors info: 

export const guarantorsInfo = async (req , res) => {


    try {

        // First, we have to take loanId and guarantors array (as we are required to save info of two guarantors at a time)
        // Each guarantor object should have: Name, CNIC, Email, Address

        const { loanId , guarantors } = req.body 
        
        // 1. Validate that either loan id is provided and guarantor is an array and have length of exact two:

        if (!loanId || !guarantors || !Array.isArray(guarantors) || guarantors.length !== 2) {
            return res.status(400).json({
                success: false ,
                message: "Loan ID and guarantor details are required"
            })
        }

        // 2. Check if the loan application exists or not: 
        const loanExists = await Loan.findById(loanId)

        if (!loanExists) {
            return res.status(404).json({
                message: "Loan Application Does Not Exist",
                success: false
            })
        }

        // 3. Guarantor array info (validate both of the guarantors have all required fields) -> Use for of loop to iterate the array

        for (let guarantor of guarantors) {
            if (!guarantor.Name || !guarantor.CNIC || !guarantor.Email || !guarantor.Address) {
                return res.status(400).json({
                    success: false,
                    message: "All fields (Name, CNIC, Email, Address) are required for each guarantor"
                })
            }
        }

        // 4. Guarantor Info in the form of array of two objects has to be stored in the DB now: 

        const guarantorsArray = await Guarantor.insertMany(
            guarantors.map((guarantor) => ({
                loanId: loanId ,
                Name:guarantor.Name,
                CNIC: guarantor.CNIC,
                Email: guarantor.Email,
                Address: guarantor.Address
            }))        
        )

        return res.status(201).json({
            message: "Guarantor details saved successfully",
            guarantors: guarantorsArray.map(info => ({
                id: info._id,
                Name: info.Name,
                CNIC: info.CNIC,
                Email: info.Email,
                Address: info.Address
            })) ,
            success: true
        })

    }

    catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false ,
            error: err.message
        })
    }

}

