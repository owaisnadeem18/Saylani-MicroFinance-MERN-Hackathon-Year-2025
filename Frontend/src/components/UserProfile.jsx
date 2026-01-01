import React from "react";
import UserDetails from "./UserDetails";
import UserLoanApplications from "./UserLoanApplications";

const UserProfile = () => {

  const mockLoans = [
  {
    _id: "6954f829400068cd1fd83845",
    userId: "6954f76d400068cd1fd83837",
    category: "Home Construction Loans",
    subcategory: "Loan",
    loanAmount: 55000,
    loanPeriod: 5,
    status: "pending",
    tokenNumber: 1,
    appointment: {
      date: "2026-01-02T10:17:13.339Z",
      time: "11:00am",
      officeLocation: "Saylani Head Office, Bahadurabad, Karachi"
    },
    createdAt: "2025-12-31T10:17:13.453Z",
    updatedAt: "2025-12-31T10:17:13.453Z"
  },
  {
    _id: "6954f829400068cd1fd83846",
    userId: "6954f76d400068cd1fd83837",
    category: "Wedding Loans",
    subcategory: "Jahez",
    loanAmount: 250000,
    loanPeriod: 3,
    status: "approved",
    tokenNumber: 2,
    appointment: {
      date: "2026-01-10T14:00:00.000Z",
      time: "02:00pm",
      officeLocation: "Saylani Head Office, Bahadurabad, Karachi"
    },
    createdAt: "2025-12-28T12:00:00.000Z",
    updatedAt: "2025-12-29T12:00:00.000Z"
  },
  {
    _id: "6954f829400068cd1fd83847",
    userId: "6954f76d400068cd1fd83837",
    category: "Education Loans",
    subcategory: "Higher Studies",
    loanAmount: 100000,
    loanPeriod: 2,
    status: "rejected",
    tokenNumber: 3,
    appointment: {
      date: "2026-01-15T09:00:00.000Z",
      time: "09:00am",
      officeLocation: "Saylani Head Office, Bahadurabad, Karachi"
    },
    createdAt: "2025-12-30T09:30:00.000Z",
    updatedAt: "2025-12-31T09:30:00.000Z"
  }
];

  return (
    <div className="bg-[#F9FAFB] min-h-[calc(100dvh-88px)]" >
      <UserDetails />
      <UserLoanApplications loans={mockLoans} />
    </div>
  );
};

export default UserProfile;
