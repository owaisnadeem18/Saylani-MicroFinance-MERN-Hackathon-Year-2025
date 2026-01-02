import React from "react";
import UserDetails from "./UserDetails";
import UserLoanApplications from "./UserLoanApplications";

const UserProfile = () => {

  return (
    <div className="bg-[#F9FAFB] min-h-[calc(100dvh-88px)]" >
      <UserDetails />
      <UserLoanApplications />
    </div>
  );
};

export default UserProfile;
