import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  PopoverGroup,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, NavLink } from "react-router-dom";
import { saylaniLogo } from "../assets";
import { LogIn, LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { handleLogout } from "@/utils/handlers/logoutHandler";
import { Button } from "./ui/button";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Calculator", path: "/loan-calculator" },
    { name: "Apply Loan", path: "/apply-for-loan" },
    // { name: "Dashboard", path: "/dashboard" },
    // { name: "Admin", path: "/admin" },
  ];
  const dispatch = useDispatch();
  const user = useSelector(state => state?.auth?.user)

  return (
    <header className="bg-white shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        {/* Logo */}  
        <div className="flex lg:flex-1">
          <NavLink to="/" className="-m-1.5 p-1.5">
            <img src={saylaniLogo} alt="Saylani Logo" className=" h-10 w-auto" />
          </NavLink>
        </div>

        {/* Mobile Button */}
        <div className="flex lg:hidden">
          <button
            type="button"  
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>

        {/* Desktop Navigation */}
        <PopoverGroup className="hidden lg:flex lg:gap-x-10">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `text-sm font-semibold nav-underline ${isActive ? "text-blue-600 border-b-2 border-b-[#2563EB]" : "text-gray-900 "}`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </PopoverGroup>                                             

        {/* Login Button */}  
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">

          {
            user ? (
              // <span className="text-sm font-semibold text-gray-900">
              //   Welcome, {user.Name}
              // </span>

              <Popover>
            <PopoverTrigger asChild>
              
              <Avatar className="w-10 h-10 rounded-full shadow cursor-pointer">
  <AvatarFallback className="
    flex items-center justify-center
    bg-linear-to-br from-blue-600 to-yellow-400
    text-white font-bold text-sm uppercase tracking-wider drop-shadow-md
  ">
    {user?.Name
      ?.split(" ")
      .map(n => n[0])
      .join("")
      .slice(0, 2) || "U"}
  </AvatarFallback>
</Avatar>
              
            </PopoverTrigger>
            <PopoverContent
              className={
                "w-[250px] p-4 shadow-md rounded-xl border-none space-y-2"
              }
            >
              <div className="flex items-center">
<Avatar className="w-10 h-10 rounded-full shadow">
  <AvatarFallback className="
    flex items-center justify-center
    bg-linear-to-br from-blue-600 to-yellow-400
    text-white font-bold text-sm uppercase tracking-wider drop-shadow-md
  ">
    {user?.Name
      ?.split(" ")
      .map(n => n[0])
      .join("")
      .slice(0, 2) || "U"}
  </AvatarFallback>
</Avatar>

                <div className="flex flex-col px-4">
                  <h6 className="leading-[1.27]"> {user.Name} </h6>
                  <p className="text-xs w-full text-muted-foreground">
                    {user?.Email || "No Email Available"}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-start justify-center">
                <div className="flex items-center ">

                    <>
                      <User2 />
                      <Link
                        to={`/profile/user/${user?.id}`}
                        variant={"link"}
                        className={"mx-2 p-0 cursor-pointer"}
                      >
                        <p className="relative inline-block text-sm font-medium group cursor-pointer">
                          View Profile

                          <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-gray-700 transition-all duration-300 group-hover:w-full"></span>
                        </p>
                      </Link>
                    </>
                  
                </div>

                <div className="flex items-center">
                  <LogOut />
                  <Button
                    variant={"link"}
                    onClick={() => handleLogout(dispatch)}
                    className={"mx-2 p-0 cursor-pointer hover:text-red-500"}

                  >
                    Logout
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

              //


            ) : 
          <NavLink
            to="/user/login"
            className="text-sm font-semibold text-gray-900 hover:text-blue-600 flex gap-2 items-center"
          >
            <LogIn /> Login
          </NavLink> 
          }

        </div>
      </nav>

      {/* Mobile Menu */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50 bg-black/20" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <NavLink to="/" className="-m-1.5 p-1.5">
              <img src={saylaniLogo} alt="Saylani Logo" className="h-10 w-auto" />
            </NavLink>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="mt-6 flow-root">
            <div className="space-y-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-lg px-3 py-2 text-base font-semibold ${
                      isActive ? "text-blue-600" : "text-gray-900"
                    } hover:bg-gray-50`
                  }
                >
                  {item.name}
                </NavLink>
              ))}

<div className="mt-6 border-t border-gray-200 pt-4">
  {user ? (
    <div className="space-y-4">
      {/* User Info */}
      <div className="flex items-center gap-3">
        <Avatar className="w-10 h-10 rounded-full shadow">
          <AvatarFallback className="  flex items-center justify-center
    bg-linear-to-br from-blue-600 to-yellow-400
    text-white font-bold text-sm uppercase tracking-wider drop-shadow-md
  ">
            {user?.Name?.split(" ").map(n => n[0]).join("").slice(0, 2) || "U"}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-semibold">{user?.Name}</span>
          <span className="text-xs text-muted-foreground">{user?.Email || "No Email"}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2">
        <Link
          to= {`/profile/user/${user?.id}`}
          onClick={() => setMobileMenuOpen(false)}
          className="flex items-center gap-2 text-sm hover:text-blue-600"
        >
          <User2 size={16} /> View Profile
        </Link>
        <Button
          variant="link"
          onClick={() => {
            handleLogout(dispatch);
            setMobileMenuOpen(false);
          }}
          className="flex items-center justify-start gap-2 p-0 text-sm text-red-500"
        >
          <LogOut size={16} /> Logout
        </Button>
      </div>
    </div>
  ) : (
    <NavLink
      to="/user/login"
      onClick={() => setMobileMenuOpen(false)}
      className="block text-sm font-semibold text-gray-900 hover:text-blue-600"
    >
      <LogIn className="inline mr-2" /> Login
    </NavLink>
  )}
</div>


            </div>
          </div>       
        </DialogPanel>
      </Dialog>
    </header>
  );
}
