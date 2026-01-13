import React from 'react';
import { CheckCircle, Clock } from 'lucide-react';

const ApprovedLoansPageHeader = () => {
  return (
    <div className="flex flex-col gap-6 mb-6 bg-white p-6 rounded-lg shadow-md border border-gray-200">
      
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-primary-black flex items-center gap-2">
          <CheckCircle className="text-green-500" /> Approved Loans
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          View all loans that have been successfully approved by the admin.  
          Sorted on First Come, First Serve basis.
        </p>
      </div>

      {/* Info Bar */}
      <div className="flex flex-wrap gap-3 mt-3">
  <div className="flex items-center gap-2 bg-green-50 text-green-800 px-3 py-1 rounded-full shadow-sm border border-green-100 text-xs md:text-sm">
    <CheckCircle className="w-4 h-4" />
    <span>Only approved loans displayed</span>
  </div>

  <div className="flex items-center gap-2 bg-yellow-50 text-yellow-800 px-3 py-1 rounded-full shadow-sm border border-yellow-100 text-xs md:text-sm">
    <Clock className="w-4 h-4" />
    <span>Sorted First Come, First Serve</span>
  </div>
</div>
    </div>
  );
};

export default ApprovedLoansPageHeader;
