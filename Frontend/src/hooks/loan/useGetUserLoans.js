  import axios from "axios";
  import React, { useEffect, useState } from "react";
  import { useSelector } from "react-redux";

  const useGetUserLoans = (userId) => {
    const [loading, setLoading] = useState(false);
    const [loans, setLoans] = useState(null);

    const token = useSelector((state) => state?.auth?.token);

    const getLoanRequests = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:5000/api/loan/getLoanRequests/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log(res);

        setLoans(res.data.totalLoanApplications);

        console.log(res.data.totalLoanApplications);

        return res.data;
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      getLoanRequests();
    }, [userId]);

    return {
      loading,
      loans
    };
  };

  export default useGetUserLoans;
