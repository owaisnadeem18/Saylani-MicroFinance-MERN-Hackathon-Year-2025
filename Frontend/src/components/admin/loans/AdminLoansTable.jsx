import React from 'react'
import { Spinner } from '@/components/ui/spinner';
import { adminTableHeaders } from '@/data/AdminLoansTableHeader';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { EyeIcon, MoreHorizontalIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

const AdminLoansTable = ({data , title , loading}) => {

  const navigate = useNavigate()

  console.log("Data is " , data)

  const hasApprovedLoan = data?.some(loan => loan?.status == "approved" )
  
  const statusStyles = {
    pending: "bg-yellow-500 text-white",
    approved: "bg-green-500 text-white",
    rejected: "bg-red-500 text-white",
  };

  return (

    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-lg font-semibold text-primary-black">
            {title}
          </h2>

          {
            hasApprovedLoan &&

          <span className="text-xs text-gray-500">
            Click on an application to view details
          </span>
          }
        </div>

        <div className="p-4">
          
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

  {!loading && data.length === 0 && (
    <tr>
      <td
        colSpan={adminTableHeaders.length}
        className="py-6 text-center text-sm text-gray-500"
      >
        No loan records found
      </td>
    </tr>
  )}

    {!loading && data.length > 0 && (

            data.map((loan) => (
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
                
                <td className="px-4 py-3 text-sm"> 
                      

                      {
                        
                        hasApprovedLoan && "approved" ? 
                      
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
                      
                      
                      
                      : <Badge variant= {  loan.status === "approved"
                        ? "success"
                        : loan.status === "rejected"
                        ? "destructive"
                        : "secondary"
                      }
                      className={statusStyles[loan?.status] || ""}
                      >         
                        {loan.status.charAt(0).toUpperCase() + loan.status.slice(1) }
                    </Badge>

}

                     </td> 
                      


              </tr>
            )
            ))}
          
        </tbody>

      </table>
    </div>
        </div>
      </div>


  )
}

export default AdminLoansTable
