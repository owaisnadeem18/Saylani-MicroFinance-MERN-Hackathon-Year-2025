import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

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
            
            const res = await axios.post(`http://localhost:5000/api/guarantor` , payload , {headers: {"Content-Type": "application/json" , "Authorization" : `Bearer ${user?.token}` } , withCredentials: true } )

            console.log("Guarantor response: " , res)
        
        }

        catch (err) {
            console.log(err)
        }
        
    }

    return {
        loading ,
    }

}

export default useLoanGuarantor
