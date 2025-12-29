import { store } from '@/store'
import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const useChangePassword = () => {

    // here we have to get the user to access the id: 

    const { user , token } = useSelector(store => store?.auth)

    console.log("Store is => " , store)   
    
    console.log(`User is => ${user} `)

    console.log(`token is => ${token} `)

    const [loading , setLoading] = useState(false)

    const changePasswordHandler = async (credentials) => {
        
        console.log("Token => " , user?.token)

        try {

            const payload = {
                oldPassword: credentials.currentPassword || null ,                                                                                              
                newPassword : credentials.newPassword ,
                confirmNewPassword : credentials.confirmNewPassword
            } 

            setLoading(true)

            const res = await axios.put(
                `http://localhost:5000/api/user/${user?.id}/change-password` , payload , {headers: { "Content-Type" : "application/json" , "Authorization" : `Bearer ${token}`} , withCredentials: true }
            )

            console.log("The response from the API is => " , res)

            if (res?.data?.success) {
                toast.success(res?.data?.message)
            }

            return res.data

        }
        
        catch (err) {
            console.log(err)
            toast.error(err?.response?.data?.message || "Something went wrong ! " )
        }

        finally {
            setLoading(false)
        }
    }


  return {
      loading,
      changePasswordHandler
    }

}

export default useChangePassword
