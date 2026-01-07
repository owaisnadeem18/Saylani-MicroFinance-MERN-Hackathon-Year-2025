import AdminSidebar from "@/components/admin/dashboard/AdminSidebar";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {

  // Here, we need to check either the menu is present or not: 

  const menu = useSelector(state => state?.auth?.menu)

  return (
    <div className="flex min-h-screen">

      <div className={`transition-all ease-in-out duration-500 flex-none ${menu ? "w-full lg:w-[300px]" : "w-16 md:w-20"} bg-[#024D9A] text-white`} >
        <AdminSidebar/>
      </div>

      <div className="flex-1 p-6">
        <Outlet />
      </div>  

    </div>
  );
};

export default AdminLayout;
