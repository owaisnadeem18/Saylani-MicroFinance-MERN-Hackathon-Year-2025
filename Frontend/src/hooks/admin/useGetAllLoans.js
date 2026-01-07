import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const useGetAllLoans = () => {

  const [loading , setLoading] = useState(false)
  const [loans , setLoans] = useState([])

  const token = useSelector(state => state?.auth?.user?.token)

  const getUserLoans = async () => {

    try {
      setLoading(true)
      const res = await axios.get(`http://localhost:5000/api/admin/loans` , {headers: {"Authorization" : `Bearer ${token}`}}) 
      console.log("Users get API of loans is => " , res)

      setLoans(res?.data?.loans)

      setTableHeader(res?.data?.loans[0])

    }
    catch (err) {
      console.log(err)
    }
    finally {
      setLoading(false)
    }

  }

  useEffect(() => {
    getUserLoans()
  } , [])
  
  return {
    loading,
    loans ,
  }
}

export default useGetAllLoans
      