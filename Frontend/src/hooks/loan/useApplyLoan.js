import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const useApplyLoan = () => {
    
    // loader: 

    const [loading , setLoading] = useState(false)

    // get user id and token from the redux toolkit store:  
    
    const {user , token} = useSelector(state => state?.auth)
    
    console.log("User is => " , user)

    console.log("Token is => " , token)  

    const LoanFormHandler = async (data) => {

        try {
            setLoading(true)
            const payload = {
                userId: user?.id ,
                category: data.category ,
                subcategory: data.subcategory ,
                loanAmount: data.loanAmount , 
                loanPeriod: data.loanPeriod
            }

            const res = await axios.post("http://localhost:5000/api/loan/apply" , payload , {headers: {"Content-Type" : "application/json" , "Authorization" : `Bearer ${token}`} , withCredentials: true })
            
            // the response from the API is: 

            console.log("The response from the API is" , res)

            if (res?.data?.success) {
                toast.success(res?.data?.message)
            }

            return res.data
        
        }
        
        
        catch (err) {
            console.log(err)
            toast.error(err?.response?.data.message)
        } finally {
            setLoading(false)
        }
        
    }
  
    return {

        loading ,
        LoanFormHandler
    }
  
}

export default useApplyLoan
