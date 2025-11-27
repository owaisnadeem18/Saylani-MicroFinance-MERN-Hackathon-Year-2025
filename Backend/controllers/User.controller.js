// This is the register user API 
// Q. Where it will be used in frontend ?
// Ans. When pop up will open to enter the information of the user before proceeding qarz e hasana application 

import User from "../models/User.model"

export const registerUser =  async (req , res) => {

    try {
        const {Name , Email , CNIC} = req.body

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
            newUser
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