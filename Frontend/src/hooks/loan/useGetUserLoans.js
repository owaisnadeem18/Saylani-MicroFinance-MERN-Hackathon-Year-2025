import axios from 'axios'
import React, { useEffect, useState } from 'react'

const useGetUserLoans = (userId) => {

  const [loading , setLoading] = useState(false)
  const [loans , setLoans] = useState([])

    const getLoanRequests = async () => {
        
        try {
            const res = await axios.get(`http://localhost:5000/api/loan/getLoanRequests/${userId}`)
            
            console.log(res)
            
            setLoans(res.totalLoanApplications)
        
            return res.data

        }

        catch (err) {
            console.log(err)   
        }

        finally {
          setLoading(false)
        }
        
      }

      useEffect(() => {
        getLoanRequests()
      } , [userId])

  return {
    loading,
    getLoanRequests
}

}

export default useGetUserLoans
