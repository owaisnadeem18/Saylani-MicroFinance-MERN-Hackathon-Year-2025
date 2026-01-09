import React from "react";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, User, FileText, MoreHorizontalIcon, EyeIcon, CheckIcon, X } from "lucide-react";
import useGetAllLoans from "@/hooks/admin/useGetAllLoans";
import { useParams } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const ViewLoanRequest = () => {

  // Here, we just simply need to call the custom hook in order to get all the APIs:

  const { loans, loading } = useGetAllLoans()

  // Here , we need to call another hook to accept or reject the loan application: 
  // const
  

  const params = useParams()

  const loanId = params.id

  const loan = loans?.find(loan => loan?._id == loanId)

  console.log(loan)

  console.log(loan?.userId?.Name)


  const statusStyles = {
    pending: "bg-yellow-500 text-white",
    approved: "bg-green-500 text-white",
    rejected: "bg-red-500 text-white",
  };

  const loanStatus = [
    {icon: <CheckIcon className="w-4 h-4" /> , text: "Accept" , loadingText: "Accepting" },
    {icon: <X className="w-4 h-4" /> , text: "Reject" , loadingText: "Rejecting" },
  ]


  // Here, we need to create a helper function to implement every field in this API with loader:

  const Field = ({ loading, value }) => {
    if (loading) return <Spinner />

    return <p className="font-medium">{value}</p>;

  }

  return (
    <div className="flex flex-col gap-8">

      {/* ===== PAGE HEADER ===== */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-primary-black">
            Loan Application Details
          </h1>
          <p className="text-sm text-gray-600">
            Review complete information related to this loan request of <span className="text-[#024D9A] font-semibold" > {loan?.userId?.Name} </span>.
          </p>
        </div>

        <div className="flex justify-center items-center gap-2" >

        <Badge className={`${statusStyles[loan?.status]} p-2 font-semibold text-sm w-fit`} >
          <Field loading={loading} value={loan?.status.charAt(0).toUpperCase() + loan?.status.slice(1)} />
        </Badge>

                                  <Popover>
                            <PopoverTrigger>
                              <MoreHorizontalIcon className="cursor-pointer" aria-label="Loan actions" />
                            </PopoverTrigger>
                            <PopoverContent className={"w-fit p-1"}>
                              <div className="flex items-start  flex-col justify-center gap-2 p-0">
                                {loanStatus?.map(status => 

                                <div className='flex gap-2 items-center cursor-pointer px-2 py-1 rounded-lg hover:bg-gray-100' >
                                  <div>
                                     {status?.icon}                                 
                                  </div>
                                  <span className="text-sm" >
                                    {status?.text}
                                  </span> 
                                </div>
                                
                                )}


                              </div>
                            </PopoverContent>
                          </Popover>

        </div>
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

            <Field value={loan?.userId?.Name} loading={loading} />

          </div>

          <div>
            <p className="text-gray-500">CNIC</p>

            <Field value={loan?.userId?.CNIC} loading={loading} />

          </div>

          <div>
            <p className="text-gray-500">Email Address</p>
            <p className="font-medium"></p>

            <Field value={loan?.userId?.Email} loading={loading} />

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

            <Field value={loan?.category} loading={loading} />

          </div>

          <div>
            <p className="text-gray-500">Sub Category</p>
            <Field value={loan?.subcategory} loading={loading} />
          </div>

          <div>
            <p className="text-gray-500">Loan Amount</p>          
            <Field loading={loading} value={loan?.loanAmount.toLocaleString("en-IN")} />

          </div>

          <div>
            <p className="text-gray-500">Loan Period</p>

            <Field value={loan?.loanPeriod + " Years"} loading={loading} />

            <p className="font-medium"></p>
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
              <Field loading={loading} value={new Date(loan?.appointment?.date).toLocaleDateString()} />
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Clock className="w-4 h-4 mt-1 text-gray-500" />

            <div>
              <p className="text-gray-500">Time</p>
              <Field loading={loading} value={loan?.appointment?.time} />
            </div>
          </div>

          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 mt-1 text-gray-500" />
            <div>
              <p className="text-gray-500">Office Location</p>

              <Field loading={loading} value={loan?.appointment?.officeLocation} />
            </div>
          </div>
        </div>
      </div>

      {/* ===== META INFO ===== */}
      <div className="text-xs text-gray-500 flex justify-between">
        <span>Token Number: # {loan?.tokenNumber}</span>
        <span>Last Updated: {new Date(loan?.updatedAt).toLocaleDateString()}</span>
      </div>

    </div>
  );
};

export default ViewLoanRequest;
