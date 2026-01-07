import useGetAllLoans from "@/hooks/admin/useGetAllLoans"
import AdminLoansTable from "./AdminLoansTable"
import AllLoansPageHeader from "./AllLoansPageHeader"



const AdminLoans = () => {

  // Here we need to call the API of get loans

  const {loading , loans } = useGetAllLoans()

  return (
    <div className="flex flex-col gap-8">

      <AllLoansPageHeader/>

      {/* ===== TABLE SECTION ===== */}
      <AdminLoansTable data = {loans} title = "All Loan Applications" loading = {loading} />

    </div>
  )
}

export default AdminLoans
 