/**
 * Header — top bar on every public page.
 * Top strip: phone number & social links. Bottom strip: main navigation (Navbar).
 */
// Icon components for contact info and social media links
import {
  FaUserCircle,
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";
// Google icon with its built-in brand colors
import { FcGoogle } from "react-icons/fc";
// Main navigation bar shown below the top strip
import Navbar from "./Navbar";

// Site-wide header with contact strip and navbar
const Header = () => {
  return (
    <header className="w-full font-[Montserrat]">
      {/* Top white strip with contact details and quick links */}
      <div className="bg-white border-b border-[#F0F0F0]">
        {/* Centered row that holds left contact info and right utility links */}
        <div className="w-full max-w-[1440px] mx-auto pl-8 sm:pl-10 md:pl-12 lg:pl-14 xl:pl-16 pr-5 sm:pr-6 md:pr-8 lg:pr-10 xl:pr-12 py-2.5 md:py-0 md:h-[42px] flex items-center justify-between gap-3">
          {/* Left side: business registration number and phone */}
          <div className="flex items-center gap-3 md:gap-5 text-[10px] sm:text-[11px] md:text-[12px] font-medium text-[#1A1A1A] min-w-0">
            {/* IDE registration number — hidden on very small screens */}
            <div className="hidden sm:flex items-center gap-1.5 shrink-0">
              <FaUserCircle className="text-[#E1709A] text-[13px] shrink-0" />
              <span className="whitespace-nowrap">
                NUMBER (IDE REGISTER) CHE-250.076.012
              </span>
            </div>

            {/* WhatsApp phone number — always visible */}
            <div className="flex items-center gap-1.5 shrink-0">
              <FaWhatsapp className="text-[#E1709A] text-[14px] shrink-0" />
              <span className="whitespace-nowrap">+41789494039</span>
            </div>
          </div>

          {/* Right side: quick links and social icons — desktop only */}
          <div className="hidden lg:flex items-center gap-5 text-[11px] font-medium text-[#1A1A1A] tracking-wide shrink-0">
            <span className="hover:text-[#E1709A] cursor-pointer transition-colors uppercase">
              My Appointment
            </span>
            <span className="hover:text-[#E1709A] cursor-pointer transition-colors uppercase">
              Trainings
            </span>
            <span className="hover:text-[#E1709A] cursor-pointer transition-colors uppercase">
              Shop
            </span>
            <span className="hover:text-[#E1709A] cursor-pointer transition-colors uppercase">
              Online Gift Voucher
            </span>

            {/* Social media icon buttons */}
            <div className="flex items-center gap-2 ml-1">
              <span className="w-7 h-7 rounded-full bg-[#F5F5F5] flex items-center justify-center cursor-pointer hover:bg-[#FCE4EC] transition-colors">
                <FaFacebookF className="text-[#E1709A] text-[11px]" />
              </span>
              <span className="w-7 h-7 rounded-full bg-[#F5F5F5] flex items-center justify-center cursor-pointer hover:bg-[#FCE4EC] transition-colors">
                <FaInstagram className="text-[#1A1A1A] text-[11px]" />
              </span>
              <span className="w-7 h-7 rounded-full bg-[#F5F5F5] flex items-center justify-center cursor-pointer hover:bg-[#FCE4EC] transition-colors overflow-hidden">
                <FcGoogle className="text-[14px]" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Pink navigation bar with logo, links, and booking button */}
      <Navbar />
    </header>
  );
};

// Export so pages can render the shared site header
export default Header;
