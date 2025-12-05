export const userAuthentication = async (req , res , next) => {
    
    try {

        const loggedInUserId = req.user._id.toString()

        const userParamsId = req.params.userId
        
        if (loggedInUserId !== userParamsId) {
            return res.status(403).json({
                message: "You cannot access someone else's user account"
            })
        }
        
        next()
    }

    catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            success: false ,
            error: err.message
        })
    }

}