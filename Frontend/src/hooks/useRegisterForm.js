import React, { useState } from "react";

const useRegisterForm = () => {
  const [loading, setLoading] = useState();

  const registerUser = async (formValues) => {
    try {
      setLoading(true);
      const payload = {
        Name: formValues.name,
        CNIC: formValues.cnic,
        Email: formValues.email,
      };

      const res = await axios

    } catch (err) {}
  };
};

export default useRegisterForm;
