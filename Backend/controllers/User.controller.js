// -------------------------------------------------------------------------- 1 --------------------------------------------------------------------------


import User from "../models/User.model.js";
import { generateRandomPassword } from "../utils/generateRandomPass.js";
import { sendEmail } from "../utils/sendEmail.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

// --------------------------------------------------------------------------- 1 --------------------------------------------------------------------------

// *********Api to register user:*********


// This is the register user API
// Q. Where it will be used in frontend ?
// Ans. When pop up will open to enter the information of the user before proceeding qarz e hasana application

export const registerUser = async (req, res) => {
  try {
    const { Name, Email, CNIC } = req.body;

    console.log(req.body , " => req.body " )

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

    // check if user already exists or not with CNIC ...

    const cnicClean = CNIC.replace(/-/g , "")

     // 13 digit validation (Pakistan standard)
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

    const CNICexists = await User.findOne({ CNIC : cnicClean });

    if (CNICexists) {
      return res.status(400).json({
        message: "User with this CNIC already exists!",
        success: false,
      });
    }

    /**
     * 🔹 WHY CHECK EMAIL EXISTENCE?
     * Login requires Email + Password
     * So email must be unique.
    */

    const existenceByEmail = await User.findOne({ Email: Email.toLowerCase() })

    if (existenceByEmail) {
      return res.status(400).json({
        message: "User With this Email Already Exists",
        success: false
      })
    }

    /**
     * 🔹 WHY I GENERATED RANDOM PASSWORD?
     * Because:
     * - Password must be system-generated
     * - User receives it via email
     * - User changes it after login
    */

    const systemGeneratedPass = generateRandomPassword(8)

    // For more security save this password in DB after hashing it:

    const hashedPassword = await bcrypt.hash(systemGeneratedPass , 10)

    // If User does not exist, then register a new user in DB

    const newUser = await User.create({
      Name,
      Email: Email.toLowerCase(),
      CNIC : cnicClean ,
      role: "user" , // by default role will be user 
      Password: hashedPassword,
      mustChangePassword : true
    });

     const message = `Dear ${Name},

Your account for Saylani Microfinance (Qarz-e-Hasana) has been created.
Please use the following temporary password to login once:

Temporary Password: ${systemGeneratedPass}

After first login, you will be asked to change this password.

Regards,
Saylani Welfare Qarz-e-Hasana Team`;


    // send email to user: (system generated password)

    await sendEmail(
      Email,
      "Your Qarz-e-Hasana Account Password",
        message
    );

    return res.status(201).json({
      message: "User registered successfully!",
      success: true,
      userId: newUser._id,
      Email: newUser.Email,
      CNIC: newUser.CNIC,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: err.message,
    });
  }
};

// -------------------------------------------------------------------------- 2 --------------------------------------------------------------------------

// *********Api to login user:********* 
// Now , it's time to login the user , so that he can enter his details: 

export const loginUser = async (req , res) => {
  
  try {

    const {Email , Password} = req.body

    // check either the email present or not:

    if (!Email) {
      return res.status(404).json({
        success: false ,
        message: "Email is missing !"
      })
    }

    if (!Password) {
      return res.status(404).json({
        message: "Password is missing !",
        success: false
      })
    }

    // Now , check either the email of the user exists in the DB or not: 
    
    const userExists = await User.findOne({Email: Email.toLowerCase()})

    if (!userExists) {
      return res.status(404).json({
        message: "User With this email does not exist ! ",
        success: false
      })
    }

    // If, email exists , then we have to match the user entered password with the email present in the DB.
    
    const validatePassword = await bcrypt.compare(Password , userExists.Password)

    if (!validatePassword) {
      return res.status(401).json({
        message: "Invalid Password",
        success: false
      })
    }

    // Now, we need to generate JWT token: 
    
    const payload = { userId : userExists._id , role: userExists.role}
    const token = jwt.sign(payload , process.env.JWT_SECRET , { expiresIn: process.env.JWT_EXPIRES_IN || "7d" })

    // respond with token & user info: 
    
    return res.status(200).json({
      message: "User logged In Successfully ! ",
      success: true ,
      token ,
      userExists : {
        id: userExists._id ,
        Name: userExists.Name,
        Email : userExists.Email ,
        Password: userExists.Password ,
        CNIC: userExists.CNIC ,
        Role: userExists.role ,
        mustChangePassword: userExists.mustChangePassword
      }
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

// -------------------------------------------------------------------------- 3 --------------------------------------------------------------------------

// *********Api to get user details:*********

// After login , we need to get the details of the specific user . So, now we will create an api for that:

export const getUserDetails = async (req , res) => {
  
  try {
    const { userId } = req.params

    console.log(userId)

    // If, there is no user Id send , then we need to show error: 
    
    if (!userId) {
      return res.status(404).json({
        message: "UserId Not Found! ",
        success: false
      })
    }

    // Now , we need to fetch the user details based on this UserId , password should not be fetched because it's confidential:
    const user = await User.findById(userId).select("-Password -__v")

    if (!user) {
      return res.status(404).json({
        message: "User Not Found ! ",
        success: false
      })
    }

    // Send User details as response: 

    return res.status(200).json({
      success: true ,
      user
    })
    
  } 


  catch (err) {
    return res.status(500).json({
      message: "Internal Server Error ! ",
      success: false
    })
  }


}