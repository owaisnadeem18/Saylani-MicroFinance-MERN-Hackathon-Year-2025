import React from 'react'
import { FileText, Clock, Users } from "lucide-react"

const AllLoansPageHeader = () => {
  return (
    <>
      
      {/* ===== PAGE HEADER ===== */}
      <div className="rounded-xl border border-gray-200 bg-linear-to-r from-slate-50 to-white p-6">
        <h1 className="text-3xl font-bold text-primary-black">
          Loan Applications
        </h1>
        <p className="mt-1 text-sm text-gray-600 max-w-2xl">
          Review, track, and manage all loan applications submitted by users.
          Keep approvals and rejections organized in one place.
        </p>
      </div>

      {/* ===== QUICK INSIGHTS ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex items-center gap-4 rounded-lg border bg-white p-4">
          <FileText className="text-blue-600" />
          <div>
            <p className="text-xs text-gray-500">Applications</p>
            <p className="text-lg font-semibold">All Records</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-lg border bg-white p-4">
          <Clock className="text-yellow-600" />
          <div>
            <p className="text-xs text-gray-500">Sorting</p>
            <p className="text-lg font-semibold">First Come, First Serve</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-lg border bg-white p-4">
          <Users className="text-green-600" />
          <div>
            <p className="text-xs text-gray-500">Management</p>
            <p className="text-lg font-semibold">Admin Controlled</p>
          </div>
        </div>
      </div>

    </>
  )
}

export default AllLoansPageHeader
