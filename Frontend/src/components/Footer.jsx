import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";
import { scrollToTop } from "@/utils/scrollToTop";
import { footerLinks } from "@/data/footerQuickLinks";

const Footer = () => {
  return (
    <footer className="bg-blue-50 border-t border-gray-200 ">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-blue-700">Saylani MicroFinance</h2>
          <p className="text-gray-600 mt-3">
            Empowering individuals and communities through accessible and
            interest-free financial support.
          </p>

          {/* Socials */}
          <div className="flex items-center gap-4 mt-4">
            <Link target="_blank" to={"https://www.facebook.com/SaylaniWelfareInternationalTrust/"} className="text-blue-600 hover:text-blue-800"><Facebook size={22} /></Link>
            <Link target="_blank" to={"https://www.instagram.com/officialswit/?hl=en"} className="text-blue-600 hover:text-blue-800"><Instagram size={22} /></Link>
            <Link target="_blank" to={"https://pk.linkedin.com/company/saylani-welfare-international-trust-official"} className="text-blue-600 hover:text-blue-800"><Linkedin size={22} /></Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-blue-700 mb-3">Quick Links</h3>
          <ul className="grid gap-2 text-gray-700">

            {
              footerLinks.map(item => <li><NavLink 
              to = {item.path}
              onClick = {() => scrollToTop()}  
              className={({ isActive }) =>
                `text-sm font-semibold nav-underline ${isActive ? "text-blue-600 border-b-2 border-b-[#2563EB]" : "text-gray-900 "}`
              }                                   
              >
                {item.link}
              </NavLink>
              </li>)

            }

          </ul>
        </div>

        {/* Loan Types */}
        <div>
          <h3 className="text-lg font-semibold text-blue-700 mb-3">Loan Programs</h3>
          <ul className="grid gap-2 text-gray-700">
            <li>Wedding Loan</li>
            <li>Business Startup Loan</li>
            <li>Home Construction Loan</li>
            <li>Education Loan</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-blue-700 mb-3">Contact</h3>
          <ul className="grid gap-3 text-gray-700">
            <li className="flex items-center gap-2">
              <Mail size={18} className="text-blue-700" />
              support@saylani.org
            </li>
            <li className="flex items-center gap-2">
              <Phone size={18} className="text-blue-700" />
              +92 300 1234567
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={18} className="text-blue-700" />
              Saylani Head Office, Karachi
            </li>
          </ul>
        </div>

      </div>

      <Separator />

      {/* Bottom Strip */}
      <div className="text-center py-4 text-gray-600 text-sm">
        © {new Date().getFullYear()} Saylani MicroFinance | All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
