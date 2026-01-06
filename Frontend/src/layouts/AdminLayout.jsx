import AdminSidebar from "@/components/admin/AdminSidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">

      <div className="flex-none w-[300px] bg-[#024D9A] text-white">
        <AdminSidebar/>
      </div>

      <div className="flex-1 p-6">
        <Outlet />
      </div>

    </div>
  );
};

export default AdminLayout;
