import { clearUser } from "@/features/auth/authSlice"
import { toast } from "react-toastify"

export const handleLogout = (dispatch , navigate) => {
    dispatch(clearUser())
    navigate(`/`) 
    toast.success("Logged Out Successfully")
}      