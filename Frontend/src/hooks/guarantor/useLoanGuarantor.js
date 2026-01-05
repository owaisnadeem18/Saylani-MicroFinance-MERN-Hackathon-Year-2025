import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const useLoanGuarantor = () => {

    const [loading , setLoading] = useState(false)
    const [guarantors, setGuarantors] = useState([])

    // get info from the redux store.

    const user = useSelector(state => state?.auth?.user)

    // also get 
    
    const addGuarantor = async (formData , loanId) => {

        try {

            setLoading(true)
            
            const payload = {
                loanId,
                guarantors: formData.guarantors 
            }
            
            const res = await axios.post(`http://localhost:5000/api/guarantor` , payload , {headers: {"Content-Type": "application/json" , "Authorization" : `Bearer ${user?.token}` } , withCredentials: true })

            console.log("Guarantor response: " , res)

            if (res?.data?.success) {
                setGuarantors(res?.data?.guarantors)
            }
            
            return res.data

        }

        catch (err) {
            console.log(err.response.data.message)
            toast.error(err.response.data.message)

        }
        
        finally {
            setLoading(false)
        }

    }

    return {
        loading ,
        addGuarantor,
        guarantors
    }

}

export default useLoanGuarantor
