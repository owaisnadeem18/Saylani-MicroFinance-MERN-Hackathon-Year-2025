import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import { saylaniLogo } from "../assets";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Calculator", path: "/calculator" },
    // { name: "Apply Loan", path: "/apply-loan" },
    // { name: "Dashboard", path: "/dashboard" },
    // { name: "Admin", path: "/admin" },
  ];

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
                `text-sm font-semibold nav-underline ${isActive ? "text-blue-600 border-b-2 border-b-[#2563EB]" : "text-gray-900"}`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </PopoverGroup>                                             

        {/* Login Button */}  
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <NavLink
            to="/login"
            className="text-sm font-semibold text-gray-900 hover:text-blue-600"
          >
            Login →
          </NavLink>
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

              <NavLink
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
              >
                Login
              </NavLink>
            </div>
          </div>       
        </DialogPanel>
      </Dialog>
    </header>
  );
}
