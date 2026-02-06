import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const useUpdateStatus = () => {
  const [loading, setLoading] = useState(false);

  const token = useSelector(state => state?.auth?.user?.token);

    console.log("Token in useUpdateStatus hook: ", token);

  const updateLoanStatus = async (loanId, status) => {


    try {
      setLoading(true);


      const res = await axios.put(
  `http://localhost:5000/api/admin/loans/${loanId}/status`,
  { status },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);
            if (res?.data?.success) {
                toast.success(res?.data?.message)
            }


      console.log("Updated Loan:", res.data);

      return res.data; 

    } catch (error) {
      console.error("Update failed:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return { updateLoanStatus, loading };
};

export default useUpdateStatus;
