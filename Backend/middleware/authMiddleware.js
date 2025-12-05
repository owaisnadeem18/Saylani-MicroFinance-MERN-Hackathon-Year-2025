import jwt from "jsonwebtoken"
import User from "../models/User.model.js";

export const authMiddleware = async (req , res , next) => {

    try {
        
  let token;
    
   // Check if Authorization header exists and starts with "Bearer"
  
   if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        // Extract token from header
        token = req.headers.authorization.split(" ")[1]
        console.log("Token is => " , token)
   }

    //  If there is no token deny access: 
    
    if (!token) {
        return res.status(401).json({
            message: "Not authorized, token missing",
            success: false
        })
    }

    // Verify the user from jwt token: 

    const decoded = jwt.verify(token , process.env.JWT_SECRET)

    console.log("Decoded user info from token is => " , decoded)

    // find the user from the db with token: 

    const user = await User.findById(decoded.id).select("-password")

      if (!user) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, user not found",
      });
    }

    console.log("User is => " , user)

    req.user = user;

     next();

     
    }
    catch (err) {
        return res.status(401).json({
            message: "Not authorized, token invalid or expired",
            success: false , 
            error: err.message
        })
    }

  
} 