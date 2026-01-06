import AdminSidebar from "@/components/admin/AdminSidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">

      <div className="w-[15%] bg-gray-800 text-white">
        <AdminSidebar/>
      </div>

      <div className="w-[85%] p-6">
        <Outlet />
      </div>

    </div>
  );
};

export default AdminLayout;
