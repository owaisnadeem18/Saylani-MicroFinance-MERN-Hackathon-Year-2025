import jwt from "jsonwebtoken"
import User from "../models/User.model.js";

export const authMiddleware = async (req , res , next) => {

    try {

  let token;

   // Check if Authorization header exists and starts with "Bearer"
  
   if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        // Extract token from header
        token = req.headers.authorization.split(" ")[1]
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


    // find the user from the db with token: 

    const user = await User.findById(decoded.userId).select("-Password")

      if (!user) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, user not found",
      });
    }

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