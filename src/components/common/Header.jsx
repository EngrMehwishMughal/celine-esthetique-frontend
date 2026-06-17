import { FaUserCircle, FaWhatsapp, FaFacebookF, FaInstagram } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className="w-full">
      {/* TOP HEADER */}
      <div className="bg-white h-[80px] border-b border-gray-100">
        <div className="w-full h-full px-12 lg:px-16 flex items-center justify-between">
          
          {/* LEFT SIDE */}
          <div className="flex items-center gap-4 text-[15px] font-medium text-black">
            <div className="flex items-center gap-1">
              <FaUserCircle className="text-black text-[18px]" />
              <span>NUMBER (IDE REGISTER) CHE-250.076.012</span>
            </div>

            <div className="flex items-center gap-1">
              <FaWhatsapp className="text-black text-[18px]" />
              <span>+41789494039</span>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4 text-[14px] font-medium text-black">
            <span>MY APPOINTMENT</span>
            <span>TRAININGS</span>
            <span>SHOP</span>
            <span>ONLINE GIFT VOUCHER</span>

            <div className="flex items-center gap-4">
              <FaFacebookF className="text-pink-500" />
              <FaInstagram className="text-black" />
              <FcGoogle />
            </div>
          </div>
        </div>
      </div>

      {/* PINK LINE */}
      <div className="h-[8px] bg-[#d95895]"></div>

      <Navbar />
    </header>
  );
};

export default Header;