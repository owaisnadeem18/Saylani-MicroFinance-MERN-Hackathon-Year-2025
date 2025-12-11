import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const useRegisterForm = () => {
  
  const [loading, setLoading] = useState(false);

  const registerUserHandler = async (formValues) => {
    try {
      setLoading(true);

      const payload = {
        Name: formValues.name,
        CNIC: formValues.cnic,
        Email: formValues.email,
      };

      const res = await axios.post("http://localhost:5000/api/user/register" , payload , {
        headers: {
          "Content-Type" : "application/json"
        },
        withCredentials: true
      })

      if (res.data.success) {
         toast.success(res.data.message)
      }

      console.log("Response -> " , res)

      return res.data

    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong ! ") 
      throw err
    }
    finally {
      setLoading(false)
    }

    
  };
  return {
registerUserHandler,
loading,
};
};

export default useRegisterForm;                                                                                                                          