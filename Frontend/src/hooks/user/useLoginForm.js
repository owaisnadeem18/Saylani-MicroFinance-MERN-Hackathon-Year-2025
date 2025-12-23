import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const useLoginForm = () => {
  const [loading, setLoading] = useState(false);

  const userLoginHandler = async (formValues) => {
  try {
      const payload = {
        Email: formValues.email,
        Password: formValues.password,
      };

      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/user/login",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log("The response from the API is => ", res);

      if (res.data.success) {
        toast.success(res.data.message);
      }

      return res.data
                                                                                                                   
  } catch (err) {
    console.log(err)
    toast.error(err?.response?.data?.message || "Something went wrong ! ");
  } finally {
    setLoading(false);
  }                                                                              
                                                                                                                            
}

  return {
    loading,                                                                                             
    userLoginHandler,
  };                                                                                                                                                                                                                                                    
};

export default useLoginForm;
                                       