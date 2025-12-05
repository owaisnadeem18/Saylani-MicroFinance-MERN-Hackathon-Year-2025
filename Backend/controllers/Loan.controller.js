// This is API to apply for loan (category: Qarz e Hasana)
// Where it will be used in frontend ?
// After user registration, when user will apply for qarz e hasana loan application (form data of frontend will be sent to this API)

import Loan from "../models/Loan.model.js";
import User from "../models/User.model.js";
import QRCode from "qrcode";

// ------------------------------------- 01 --------------------------------------
// Request # 01 for the user to apply for loan 
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
    
    // 3(b). Auto-generate appointment details
    // Appointment = after 2 days at 11:00 AM in Saylani office

    const appointmentDate = new Date()

    appointmentDate.setDate(appointmentDate.getDate() + 2)

    const appointment = {
      date: appointmentDate,
      time: "11:00am",
      officeLocation: "Saylani Head Office, Bahadurabad, Karachi"
    }

    // 3(c). Generate QR code for the slip
    // QR will contain token + appointment details

    const qrPayload = `Token Number: ${token}\nCategory: ${category}\nSubcategory: ${subcategory}\nAppointment: ${appointmentDate.toDateString()} at ${appointment.time}`
    const qrImage = await QRCode.toDataURL(qrPayload)

    // 3(d). Now , let's create a new loan application in Database:

    const NewLoanApplication = await Loan.create({
      userId,
      category,
      subcategory,
      loanAmount,
      loanPeriod,
      tokenNumber: token,
      appointment: appointment
    });

    // Send response to frontend: 

    return res.status(201).json({
        success: true ,
        message: "Loan Application Submitted Successfully",
        loanId: NewLoanApplication._id,
        tokenNumber: NewLoanApplication.tokenNumber,
        appointment: appointment,
        qrImage: qrImage
    })

  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: err.message
    });
  }
};

// ------------------------------------- 02 --------------------------------------

// Request # 02 (Get request) for the user to see all the loan applications and their status

export const getUserLoanRequests = async (req , res) => {
  
  try {

    // 1. First, we have to get the user to show him all of the requests that the user has applied so far: 

    const { userId } = req.params;

    console.log("userId is => " , userId)

    if (!userId) {
      return res.status(400).json({
        message: "UserId is missing in the request parameters",
        success: false
      })
    }

    // Now, check either user exists with this id or not: So,

    const userExists = await User.find({userId})

    const verifyUserId = await User.findById(userId) 
                    
    console.log("userExists => " , verifyUserId)

    if (!verifyUserId) {
      return res.status(404).json({
        message: "User does not exist",
        success: false
      })
    }          
    
    // 2. Find the all loan applications user has applied so far:  
     
    const totalLoanApplications = await Loan.find({userId})

    console.log("totalLoanApplications => " , totalLoanApplications)
    
    if (totalLoanApplications.length <= 0) {
      return res.status(200).json({
        message: "User did not apply for any loan so far.",
        success: true
      }) 
    } 

    return res.status(200).json({
      totalLoanApplications,
      success: true
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