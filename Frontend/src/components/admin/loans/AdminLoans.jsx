import { Spinner } from '@/components/ui/spinner';
import { adminTableHeaders } from '@/data/AdminLoansTableHeader';
import useGetAllLoans from '@/hooks/admin/useGetAllLoans';
import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Check, CheckCircle, Cross, CrossIcon, Edit2, EyeIcon, MoreHorizontalIcon, User, View, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminLoans = () => {

  const { loans, loading } = useGetAllLoans()

  const navigate = useNavigate()

  console.log("Loans in the get api of /dashboard/loans are -> ", loans)

  return (
    <div className="w-full h-auto rounded-md border border-gray-200 ">
      <table className="min-w-full table-fixed border-collapse relative">

        {/* ==== HEADERS ==== */}
        <thead className="bg-[#E6EDF5] text-primary-black font-semibold text-sm sticky top-0 z-10">
          <tr>
            {adminTableHeaders.map((header, index) => {

              // if (header.key === "cost") alignment = "text-right";
              // if (header.key === "action") alignment = "text-left";
              // if (header.key === "status") alignment = "text-left";

              return (
                <th
                  key={index}
                  className={`px-4 py-2 whitespace-nowrap text-left`}
                >
                  {header}
                </th>
              );
            })}
          </tr>
        </thead>

        {/* ==== ROWS ==== */}

        <tbody>
          {loading ? (
            <tr>
  <td
    colSpan={adminTableHeaders.length}
    className="py-3 text-center"
  >
    <div className="flex justify-center">
      <Spinner />
    </div>
  </td>
</tr>

          ) : (
            loans.map((loan) => (
              <tr key={loan._id} className="hover:bg-gray-100 border-b border-gray-300">
                <td className="px-4 py-3 text-sm">{loan.tokenNumber}</td>
                <td className="px-4 py-3 text-sm">{loan.userId?.Name}</td>
                <td className="px-4 py-3 text-sm">{loan.userId?.CNIC}</td>
                <td className="px-4 py-3 text-sm">{loan.userId?.Email}</td>
                <td className="px-4 py-3 text-sm">{loan.category}</td>
                <td className="px-4 py-3 text-sm">{loan.subcategory}</td>
                <td className="px-4 py-3 text-sm">{loan.loanAmount}</td>
                <td className="px-4 py-3 text-sm">{loan.loanPeriod}</td>
                <td className="px-4 py-3 text-sm">
                  {loan.appointment?.date ? new Date(loan.appointment.date).toLocaleDateString() : "-"}
                </td>
                <td className="px-4 py-3 text-sm">{loan.status}</td>
                <td className="px-4 py-3 text-sm"> 
                      <Popover>
                        <PopoverTrigger>
                          <MoreHorizontalIcon className="cursor-pointer" />
                        </PopoverTrigger>
                        <PopoverContent className={"w-fit p-2"}>
                          <div className="flex items-start  flex-col justify-center gap-2 p-0">
                            <div onClick={() => navigate(`/admin/loan/${loan._id}`)} className='flex gap-2 items-center cursor-pointer' >
                              <EyeIcon width={15} />
                              <span className='text-sm' >View</span>
                            </div>
                          <div className='flex gap-2 cursor-pointer items-center'  >
                            <CheckCircle className="cursor-pointer" width={15} />
                            <span className='text-sm' >Approve</span>
                          </div>
                          <div className='flex gap-2 cursor-pointer items-center' >
                            <X className="cursor-pointer" width={15} />
                            <span className='text-sm' >Reject</span>
                          </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                     </td>
              </tr>
            ))
          )}
        </tbody>

      </table>
    </div>
  )
}

export default AdminLoans
