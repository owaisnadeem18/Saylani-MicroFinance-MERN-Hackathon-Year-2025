
import { 
  HandCoins, 
  FileCheck, 
  Users, 
  QrCode, 
  LayoutDashboard
} from "lucide-react";

export const headerItems = [
  {
    icon: LayoutDashboard ,
    text: "Dashboard",
    route: "/admin/dashboard",
  },
  {
    icon: HandCoins ,
    text: "Loan Applications",
    route: "/admin/loans",
  },
  {
    icon: FileCheck ,
    text: "Approved Loans",
    route: "/admin/approved-loans",
  },
  {
    icon: QrCode ,
    text: "QR Management",
    route: "/admin/qrcodes",
  },
  {
    icon: Users ,
    text: "Users",
    route: "/admin/users",
  },
];