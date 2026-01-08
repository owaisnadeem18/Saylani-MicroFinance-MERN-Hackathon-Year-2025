import React from "react";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, User, FileText } from "lucide-react";
import useGetAllLoans from "@/hooks/admin/useGetAllLoans";
import { useParams } from "react-router-dom";

const ViewLoanRequest = () => {

  // Here, we just simply need to call the custom hook in order to get all the APIs:

  const {loans , loading} = useGetAllLoans()

  const params = useParams()

  const loanId = params.id
  

  const loan = loans?.filter(loan => loan?._id == loanId)

  console.log(loan)

  return (
    <div className="flex flex-col gap-8">

      {/* ===== PAGE HEADER ===== */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-primary-black">
            Loan Application Details
          </h1>
          <p className="text-sm text-gray-600">
            Review complete information related to this loan request.
          </p>
        </div>

        <Badge >                         
          Approved
        </Badge>
      </div>

      {/* ===== APPLICANT INFO ===== */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <User className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold">Applicant Information</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div>
            <p className="text-gray-500">Full Name</p>
            <p className="font-medium">Owais Nadeem</p>
          </div>

          <div>
            <p className="text-gray-500">CNIC</p>
            <p className="font-medium">42201-7674302-9</p>
          </div>

          <div>
            <p className="text-gray-500">Email Address</p>
            <p className="font-medium">owaisnadeem15@gmail.com</p>
          </div>
        </div>
      </div>

      {/* ===== LOAN DETAILS ===== */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold">Loan Details</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
          <div>
            <p className="text-gray-500">Category</p>
            <p className="font-medium">Home Construction Loans</p>
          </div>

          <div>
            <p className="text-gray-500">Sub Category</p>
            <p className="font-medium">Finishing</p>
          </div>

          <div>
            <p className="text-gray-500">Loan Amount</p>
            <p className="font-medium">123,400</p>
          </div>

          <div>
            <p className="text-gray-500">Loan Period</p>
            <p className="font-medium">5 Years</p>
          </div>
        </div>
      </div>

      {/* ===== APPOINTMENT DETAILS ===== */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold">Appointment Information</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="flex items-start gap-2">
            <Calendar className="w-4 h-4 mt-1 text-gray-500" />
            <div>
              <p className="text-gray-500">Date</p>
              <p className="font-medium">07 January 2026</p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Clock className="w-4 h-4 mt-1 text-gray-500" />
            <div>
              <p className="text-gray-500">Time</p>
              <p className="font-medium">11:00 AM</p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 mt-1 text-gray-500" />
            <div>
              <p className="text-gray-500">Office Location</p>
              <p className="font-medium">
                Saylani Head Office, Bahadurabad, Karachi
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== META INFO ===== */}
      <div className="text-xs text-gray-500 flex justify-between">
        <span>Token Number: #1</span>
        <span>Last Updated: 07 Jan 2026</span>
      </div>

    </div>
  );
};

export default ViewLoanRequest;
