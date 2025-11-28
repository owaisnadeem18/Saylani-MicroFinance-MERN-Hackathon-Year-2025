// -------------------------------------------------------------------------- 1 -------------------------------------------------------------------------- 

// This is the register user API 
// Q. Where it will be used in frontend ?
// Ans. When pop up will open to enter the information of the user before proceeding qarz e hasana application 

import User from "../models/User.model"
export const registerUser =  async (req , res) => {

    try {
        const {Name , Email , CNIC} = req.body

        if (!Name || !Email || !CNIC) {
            return res.status(400).json({
                success: false,
                message: "Something is missing ! "
            })
        }

        // check if user already exists or not with CNIC ...

        const isUserExisted = await User.findOne({CNIC})

        if (isUserExisted) {
            return res.status(400).json({
                message: "User with this CNIC already exists!" ,
                success: false,
            }
            )
        }

        // generate a random password , which backend will send to the user on it's email after successfull registration: 
        const password = Math.random().toString(36).substring(2,8)

        // If User does not exist, then register a new user in DB 

        const newUser = await User.create({
            Name , 
            Email ,
            CNIC , 
            Password:password
        })

        return res.status(201).json({
            message: "User registered successfully!" ,
            success: true,
            userId: newUser._id,
            Email: newUser.Email,
            CNIC: newUser.CNIC
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

// -------------------------------------------------------------------------- 2 -------------------------------------------------------------------------- 

// Apply for loan (category: Qarz e Hasana) API
// Q. Where it will be used in frontend ?
// Ans. After user registration, when user will apply for qarz e hasana loan application (form data of frontend will be sent to this API)

