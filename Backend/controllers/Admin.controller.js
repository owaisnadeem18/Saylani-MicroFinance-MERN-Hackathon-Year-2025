// Admin Controller

// 1️⃣ Get all loan applications (for admin view)
// 2️⃣ Update the status of a loan application (approve or reject)
// 3️⃣ QR code generation for loan applications (optional)

// ----------------------------------------------------------------------- 1 ---------------------------------------------------------------------

// Get all loans (Get Request)

import Loan from "../models/Loan.model.js";
import QR from "../models/QR.model.js";
import QRCode from "qrcode";

export const getAllLoans = async (req, res) => {
  try {
    // We have to get all the loans whose are present in the DB:

    const loans = await Loan.find().sort({ createdAt: -1 }).populate("userId" , "Name Email CNIC").lean();

    if (loans.length == 0) {
      return res.status(200).json({        
        success: true,
        message: "No Loans Application ! ",
      });
    }

    return res.status(200).json({
      success: true,
      totalApplications: loans.length,
      loans,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: err.message,
    });
  }
};

// ----------------------------------------------------------------------- 2 ---------------------------------------------------------------------

export const updateStatus = async (req, res) => {
  try {
    // 1. Here , we have to first get the Loan Id for updating the status:

    const loanId = req.params.id;

    const { status } = req.body;



    // 2. Validation Steps:
    if (!status || !["approved", "rejected"].includes(status.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid status: 'approved' or 'rejected'",
      });
    }

    // 3. Now, we have to find either the loan application present in the DB or not:

    const loan = await Loan.findById(loanId);

    if (!loan) {
      return res.status(404).json({
        message: "Loan Application Does not exist",
        success: false,
      });
    }

    // 4. Now update the status , which admin entered:

    loan.status = status.toLowerCase();

    await loan.save();

    // 5. Now, we have to send success status , after all this:

    return res.status(200).json({
      message: `Loan Application ${loan.status}`,
      success: true,
      loanId: loan._id,
      status: loan.status,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: err.message,
    });
  }
};

//  ----------------------------------------------------------------------- 3 ---------------------------------------------------------------------

// API # 03 to generate QR code for loan application (We have added QR related things in the database , so we can get the data from loan.model.js)

export const generateQRcode = async (req, res) => {
  try {
    // 1. get the id from route params:
    const loanId = req.params.id;

    // 2. first find that specific loan application with the help of it's specific id

    const loan = await Loan.findById(loanId);

    if (!loan) {
      return res.status(404).json({
        message: "Loan Application Not Found",
        success: false,
      });
    }

    // 3. Now , we have to check , either the QR of this specific loan is already existed in the DB or not:

    const existingQR = await QR.findOne({loanId})

    // If the QR code is already generated, then we can simply use this one and will store in QR model:

    if (existingQR) {
      return res.status(200).json({
        success: true ,
        message: "QR code for this specific loan , has already been generated.",
        loanId: loan._id ,
        tokenNumber: existingQR.tokenNumber,
        QRCodeImage: existingQR.QRCodeImage ,
        appointment: existingQR.appointment
      })
    }
     
    // Generate QR code data , if it's not already present: 

    const tokenNumber = loan.tokenNumber 

    const appointment = loan.appointment || {
      date: new Date(), // today
      time: "10:00",       
      officeLocation: "Saylani Welfare Head Office Bahadurabad",      
    }

    const qrPayload = `LoanId: ${loanId}\nToken: ${tokenNumber}\nAppointment: ${appointment.date.toLocaleDateString()} at ${appointment.time}`;
    
    const qrCodeImage = await QRCode.toDataURL(qrPayload);

    // Save QR to DB

    await QR.create({
      loanId,
      tokenNumber,
      QRCodeImage: qrCodeImage,
      appointment,
    });

    return res.status(201).json({
      message: "QR code generated successfully",
      success: true,
      loanId: loan._id, 
      tokenNumber,
      QRCodeImage: qrCodeImage, 
      appointment,
    });           
  }
   
  catch (err) {
    return res.status(500).json({                                            
      message: "Internal Server Error",
      success: false,
      error: err.message,  
    });                           
  }                                                                       

};
