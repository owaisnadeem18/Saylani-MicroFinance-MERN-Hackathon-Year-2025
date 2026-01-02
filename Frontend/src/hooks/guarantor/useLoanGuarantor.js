import axios from 'axios'
import React, { useState } from 'react'

const useLoanGuarantor = () => {

    const [loading , setLoading] = useState(false)
    const [guarantors, setGuarantors] = useState([])
    
    const addGuarantor = async (guarantor) => {
        const res = await axios.post(`http://localhost:5000/api/guarantor`  )
    }

    return {
        loading ,
    }

}

export default useLoanGuarantor
