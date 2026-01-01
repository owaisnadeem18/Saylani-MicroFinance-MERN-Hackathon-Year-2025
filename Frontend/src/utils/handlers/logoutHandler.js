import { clearUser } from "@/features/auth/authSlice"
import { toast } from "react-toastify"

export const handleLogout = (dispatch) => {
    dispatch(clearUser())
    toast.success("Logged Out Successfully")
}