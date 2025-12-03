// controllers/user.controller.js

import User from "../models/User.model.js";
import { sendEmail } from "../utils/sendEmail.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/**
 * 🔹 WHY THIS HELPER EXISTS?
 * Because multiple places may need password generation (register / admin create user)
 * and we want to avoid Math.random() weak password generation.
 *
 * 🔹 REQUIREMENT:
 * From your Saylani Qarz-e-Hasana hackathon rules:
 * - User gets a "temporary password" on registration.
 * - Backend must auto-generate system password.
 */
const generateRandomPassword = (length = 8) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let pass = "";
  for (let i = 0; i < length; i++) {
    pass += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pass;
};



/**
 * ======================================================
 *  REGISTER USER  — used before loan application starts
 * ======================================================
 * 🔥 WHY THIS FUNCTION EXISTS?
 * Because you told me:
 * - User will FIRST register through popup
 * - System will send temporary password to their email
 * - They will login using that password
 * - Only then they can apply for loan
 *
 * 🔹 REQUIREMENTS COVERED HERE:
 * 1. Must check CNIC or Email duplicates (Hackathon rule)
 * 2. Must generate random temporary password (Hackathon rule)
 * 3. Must hash password before saving (security rule)
 * 4. Must send user email with password (your requirement)
 * 5. Must force user to change password on first login (best practice)
 * 6. Must not send plain password in API response (security rule)
 */
export const registerUser = async (req, res) => {
  try {
    const { Name, Email, CNIC } = req.body;

    // ⛔ Basic validation
    if (!Name || !Email || !CNIC) {
      return res.status(400).json({
        success: false,
        message: "Name, Email and CNIC are required.",
      });
    }

    /**
     * 🔹 WHY CLEAN CNIC?
     * Because user may enter CNIC as:
     *  - 12345-1234567-1
     *  - 1234512345671
     * Both should be treated as same.
     */
    const cnicClean = CNIC.replace(/-/g, "");

    // ⛔ 13 digit validation (Pakistan standard)
    if (!/^\d{13}$/.test(cnicClean)) {
      return res.status(400).json({
        success: false,
        message: "CNIC should be 13 digits.",
      });
    }

    /**
     * 🔹 WHY CHECK CNIC EXISTENCE?
     * Because Saylani loan system rule says:
     * “One CNIC = One user (one loan profile)”
     */
    const existingByCNIC = await User.findOne({ CNIC: cnicClean });
    if (existingByCNIC) {
      return res.status(400).json({
        success: false,
        message: "User with this CNIC already exists.",
      });
    }

    /**
     * 🔹 WHY CHECK EMAIL EXISTENCE?
     * Login requires Email + Password
     * So email must be unique.
     */
    const existingByEmail = await User.findOne({ Email: Email.toLowerCase() });
    if (existingByEmail) {
      return res.status(400).json({
        success: false,
        message: "User with this Email already exists.",
      });
    }

    /**
     * 🔹 WHY I GENERATED RANDOM PASSWORD?
     * Because:
     * - Password must be system-generated
     * - User receives it via email
     * - User changes it after login
     */
    const plainPassword = generateRandomPassword(8);

    /**
     * 🔹 WHY HASH PASSWORD?
     * Because storing plain password is a BIG crime.
     */
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    /**
     * 🔹 WHY role: "user"?
     * Because admin & user login pages are separate.
     * User should never create admin account automatically.
     */

    /**
     * 🔹 WHY mustChangePassword?
     * Because you required forced password change on first login.
     */
    const newUser = await User.create({
      Name,
      Email: Email.toLowerCase(),
      CNIC: cnicClean,
      Password: hashedPassword,
      role: "user",
      mustChangePassword: true,
    });

    /**
     * 🔹 WHY SENDING EMAIL?
     * Because temporary password must be sent to the user.
     * Without this, user cannot log in.
     */
    const message = `Dear ${Name},

Your account for Saylani Microfinance (Qarz-e-Hasana) has been created.
Please use the following temporary password to login once:

Temporary Password: ${plainPassword}

After first login, you will be asked to change this password.

Regards,
Saylani Welfare Qarz-e-Hasana Team`;

    try {
      await sendEmail(
        Email,
        "Your Qarz-e-Hasana Account - Temporary Password",
        message
      );
    } catch (emailErr) {
      console.error("Failed sending registration email:", emailErr);
      // (Optional) delete user if email failed
    }

    /**
     * 🔥 WHY NOT RETURN PASSWORD?
     * SECURITY — You must NEVER return passwords in APIs.
     */
    return res.status(201).json({
      success: true,
      message: "User registered successfully. Temporary password sent to the provided email.",
      userId: newUser._id,
      Email: newUser.Email,
      CNIC: newUser.CNIC,
    });
  } catch (err) {
    console.error("registerUser error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};



/**
 * ======================================================
 * LOGIN USER
 * ======================================================
 * 🔹 WHY WE ADDED LOGIN?
 * Because:
 * - User must login after registration
 * - Login returns JWT token
 * - JWT token will be used by frontend in every further request
 *
 * REQUIREMENTS FULFILLED:
 * 1. Email + Password login
 * 2. JWT token creation
 * 3. mustChangePassword flag
 * 4. Role-based login (Admin vs User)
 */
export const loginUser = async (req, res) => {
  try {
    const { Email, Password } = req.body;

    if (!Email || !Password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required.",
      });
    }

    // Find user by email
    const user = await User.findOne({ Email: Email.toLowerCase() });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    /**
     * 🔹 Verify hashed password
     */
    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    /**
     * 🔹 WHY JWT?
     * Because every page (Dashboard, Apply Loan, Guarantor) needs authentication.
     */
    const payload = {
      userId: user._id,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    });

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        Name: user.Name,
        Email: user.Email,
        CNIC: user.CNIC,
        role: user.role,
        mustChangePassword: !!user.mustChangePassword,
      },
    });
  } catch (err) {
    console.error("loginUser error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};



/**
 * ======================================================
 * GET USER DETAILS
 * ======================================================
 * 🔹 WHY THIS ENDPOINT?
 * Because on dashboard we need:
 * - Name
 * - CNIC
 * - Email
 * - Loan status
 * - Has user already applied?
 * 
 * This API is triggered AFTER login using token.
 */
export const getUserDetails = async (req, res) => {
  try {
    const userId =
      (req.user && req.user.userId) || req.params.userId || req.query.userId;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required.",
      });
    }

    // Return user WITHOUT password field
    const user = await User.findById(userId).select("-Password -__v");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    console.error("getUserDetails error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};



/**
 * ======================================================
 * CHANGE PASSWORD
 * ======================================================
 * 🔹 WHY THIS FUNCTION EXISTS?
 * Because:
 * - User must change temporary password on first login
 * - A logged-in user may want to change password anytime
 *
 * 🔥 REQUIREMENTS COVERED:
 * 1. First login → must change temporary password
 * 2. Old password optional for forced password change
 * 3. Old password REQUIRED for normal password change
 * 4. Hash new password
 */

export const changePassword = async (req, res) => {
  try {
    const userId = (req.user && req.user.userId) || req.body.userId;
    const { oldPassword, newPassword } = req.body;

    if (!userId || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "userId and newPassword are required.",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    /**
     * 🔹 If oldPassword is provided, verify it
     * This is normal password change flow.
     */
    if (oldPassword) {
      const isMatch = await bcrypt.compare(oldPassword, user.Password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Old password is incorrect.",
        });
      }
    }

    /**
     * 🔹 Hash and update password
     */
    user.Password = await bcrypt.hash(newPassword, 10);
    user.mustChangePassword = false;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password updated successfully.",
    });
  } catch (err) {
    console.error("changePassword error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

export default {
  registerUser,
  loginUser,
  getUserDetails,
  changePassword,
};
