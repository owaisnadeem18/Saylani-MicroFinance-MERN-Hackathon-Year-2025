import { Spinner } from '@/components/ui/spinner';
import { adminTableHeaders } from '@/data/AdminLoansTableHeader';
import useGetAllLoans from '@/hooks/admin/useGetAllLoans';
import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { EyeIcon, MoreHorizontalIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminLoansTable = () => {

  const { loans, loading } = useGetAllLoans();
  const navigate = useNavigate();

  return (
    <div className="w-full h-auto rounded-md border border-gray-200 ">
      <table className="min-w-full table-fixed border-collapse relative">

        {/* ==== HEADERS ==== */}
        <thead className="bg-[#E6EDF5] text-primary-black font-semibold text-sm sticky top-0 z-10">
          <tr>
            {adminTableHeaders.map((header, index) => {

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
          
            {loading && (
    <tr>
      <td colSpan={adminTableHeaders.length} className="py-3 text-center">
        <div className="flex justify-center">
          <Spinner />
        </div>
      </td>
    </tr>
  )}

  {!loading && loans.length === 0 && (
    <tr>
      <td
        colSpan={adminTableHeaders.length}
        className="py-6 text-center text-sm text-gray-500"
      >
        No loan records found
      </td>
    </tr>
  )}

    {!loading && loans.length > 0 && (

            loans.map((loan) => (
              <tr key={loan._id} className="hover:bg-gray-100 border-b border-gray-300">
                <td className="px-4 py-3 text-sm">{loan.tokenNumber}</td>
                <td className="px-4 py-3 text-sm">{loan.userId?.Name}</td>
                <td className="px-4 py-3 text-sm">{loan.userId?.CNIC}</td>
                <td className="px-4 py-3 text-sm">{loan.userId?.Email}</td>
                <td className="px-4 py-3 text-sm">{loan.category}</td>
                <td className="px-4 py-3 text-sm">{loan.subcategory}</td>
                <td className="px-4 py-3 text-sm">{loan.loanAmount.toLocaleString("en-IN")} </td>
                <td className="px-4 py-3 text-sm">{loan.loanPeriod} Years </td>
                <td className="px-4 py-3 text-sm">
                  {loan.appointment?.date ? new Date(loan.appointment.date).toLocaleDateString() : "-"}
                </td>
                {/* <td className="px-4 py-3 text-sm">
                    <Badge variant= {  loan.status === "approved"
                          ? "success"
                          : loan.status === "rejected"
                          ? "destructive"
                          : "secondary"
                      }
                      className={statusStyles[loan?.status] || ""}
                      >         
                        {loan.status.charAt(0).toUpperCase() + loan.status.slice(1) }
                    </Badge>

                </td> */}
                <td className="px-4 py-3 text-sm"> 
                      <Popover>
                        <PopoverTrigger>
                          <MoreHorizontalIcon className="cursor-pointer" aria-label="Loan actions" />
                        </PopoverTrigger>
                        <PopoverContent className={"w-fit p-2 hover:bg-gray-100"}>
                          <div className="flex items-start  flex-col justify-center gap-2 p-0">
                            <div onClick={() => navigate(`/admin/loans/${loan._id}`)} className='flex gap-2 items-center cursor-pointer ' >
                              <EyeIcon width={16} />
                              <span className='text-sm' >View</span>
                            </div>
                             
                          </div>
                        </PopoverContent>
                      </Popover>
                     </td>
              </tr>
            )
            ))}
          
        </tbody>

      </table>
    </div>
  )
}

export default AdminLoansTable
