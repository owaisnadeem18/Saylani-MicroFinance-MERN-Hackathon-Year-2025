import React from 'react';
import ApprovedLoansPageHeader from './ApprovedLoansPageHeader';
import AdminLoansTable from './AdminLoansTable';
import useGetAllLoans from '@/hooks/admin/useGetAllLoans';

const AdminApprovedLoans = () => {

  const {loading , loans} = useGetAllLoans()

  const approvedLoans = loans.filter(loan => loan?.status.toLowerCase() == "approved" )

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <ApprovedLoansPageHeader />

      {/* Table Section */}                                                        
      <div className="bg-white rounded-lg border border-gray-200">
        <AdminLoansTable data={approvedLoans} title={"All Approved Loans"} loading={loading} />
      </div>                            

    </div>
  )
}

export default AdminApprovedLoans;                                                                                                                                       
                                                                                                                                                                                                                        