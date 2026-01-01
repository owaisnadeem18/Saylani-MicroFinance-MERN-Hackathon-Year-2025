import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const useGetUser = (userId) => {

    // get token from the redux store:

    const {token} = useSelector(state => state?.auth)

    const [loading,setLoading] = useState(false)
    const [info, setInfo] = useState(null)

    const fetchUser = async () => {
        
        try {
            setLoading(true)
            const res = await axios.get(`http://localhost:5000/api/user/${userId}` , {  headers: { Authorization: `Bearer ${token}` }} )

            console.log(res)
            
            setInfo(res.data)
            return res.data

        }

        catch (err) {
            console.log(err)            
        } finally {
            setLoading(false)
        }

    }

      // Auto-fetch on mount
  useEffect(() => {
    fetchUser();
  }, [userId]);


    return {
        info,
        loading ,
        fetchUser
    }

}

export default useGetUser
