// Admin Middleware
// Ensures the logged-in user is an admin before accessing admin routes

export const adminMiddleware = async (req, res, next) => {
  
   try {

        if (!req.user) {
            return res.status(401).json({
                success: false ,
                message: "Not authorized, user info missing"
            })
        }

        if (req.user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Access denied, only admin can perform this action"
            })
        }

        // user is admin then proceed: 

        next()

    } 
  
    catch (err) {
        return res.status(500).json({
        success: false,
        message: "Internal Server Error in admin middleware",
        error: err.message,
        });
    }
};
