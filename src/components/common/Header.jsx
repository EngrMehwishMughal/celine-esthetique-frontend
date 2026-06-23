import {
  FaUserCircle,
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className="w-full font-[Montserrat]">
      <div className="bg-white border-b border-[#F0F0F0]">
        <div className="w-full max-w-[1440px] mx-auto pl-8 sm:pl-10 md:pl-12 lg:pl-14 xl:pl-16 pr-5 sm:pr-6 md:pr-8 lg:pr-10 xl:pr-12 py-2.5 md:py-0 md:h-[42px] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 md:gap-5 text-[10px] sm:text-[11px] md:text-[12px] font-medium text-[#1A1A1A] min-w-0">
            <div className="hidden sm:flex items-center gap-1.5 shrink-0">
              <FaUserCircle className="text-[#E1709A] text-[13px] shrink-0" />
              <span className="whitespace-nowrap">
                NUMBER (IDE REGISTER) CHE-250.076.012
              </span>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <FaWhatsapp className="text-[#E1709A] text-[14px] shrink-0" />
              <span className="whitespace-nowrap">+41789494039</span>
            </div>
          </div>

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

      <Navbar />
    </header>
  );
};

export default Header;
