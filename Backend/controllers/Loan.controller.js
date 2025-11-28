// This is API to apply for loan (category: Qarz e Hasana)
// Where it will be used in frontend ?
// After user registration, when user will apply for qarz e hasana loan application (form data of frontend will be sent to this API)

import Loan from "../models/Loan.model.js";
import User from "../models/User.model.js";

export const applyForLoan = async (req, res) => {
  try {
    const { userId, category, subcategory, loanAmount, loanPeriod } = req.body;

    // 1. Validate all required fields are filled !

    if (!userId || !category || !subcategory || !loanAmount || !loanPeriod) {
      return res.status(400).json({
        success: false,
        message: "Something is missing",
      });
    }

    // 2. Check either the user exists in the db or not:

    const userExists = await User.findById(userId);

    if (!userExists) {
      return res.status(404).json({
        success: false,
        message: "User does not exist ! ",
      });
    }

    // 3. After all above validations , now we can move towards the next step i.e creating a new loan application:

    // 3(a). Generate a token number with respect to every loan application:

    const totalLoanApplications = await Loan.countDocuments();
    const token = totalLoanApplications + 1;

    // 3(b). Now , let's create a new loan application:

    const NewLoanApplication = await Loan.create({
      userId,
      category,
      subcategory,
      loanAmount,
      loanPeriod,
      tokenNumber: token,
    });

    return res.status(201).json({
        message: "Loan Application Submitted Successfully",
        loanId: NewLoanApplication._id,
        tokenNumber: NewLoanApplication.tokenNumber
    })

  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: err.message
    });
  }
};
