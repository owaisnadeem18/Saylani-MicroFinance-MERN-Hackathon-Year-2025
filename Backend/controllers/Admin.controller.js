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

    const loans = await Loan.find().sort({ createdAt: -1 });

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

// API # 03 to generate QR code for loan application

export const generateQRcode = async (req, res) => {
  try {
    // 1. get the id from route params:
    const loanId = req.params.id;

    // QR code generation logic will go here

    // 2. first find that specific loan application with the help of it's specific id

    const loan = await Loan.findById(loanId);

    if (!loan) {
      return res.status(404).json({
        message: "Loan Application Not Found",
        success: false,
      });
    }

    // 3. Now , we have to assign the unique token # with respect to the application of loan (this is required to generate QR code):

    const lastQR = await QR.findOne().sort({ tokenNumber: -1 }); // get last token

    const tokenNumber = lastQR.tokenNumber ? lastQR.tokenNumber + 1 : 1;

    const Qrdata = `LoanId ${loanId}, Token ${tokenNumber}`;
    const QrCodeImage = await QRCode.toDataURL(Qrdata);

    // Optional: assign appointment:

    const appointment = {
      date: new Date(), // today
      time: "10:00 AM",
      officeLocation: "Saylani Welfare Head Office Bahadurabad",
    };

    // save to QR Collection:

    const newQR = await QR.create({
      loanId,
      tokenNumber,
      QrCodeImage: QrCodeImage,
      appointment,
    });

    return res.status(201).json({
      message: "QR code generated successfully",
      success: true,
      loanId: loan._id,
      tokenNumber,
      QRCodeImage: QrCodeImage,
      appointment,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: err.message,
    });
  }
};
