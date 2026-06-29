import { useNavigate } from "react-router-dom";
import { logoutUser } from "@/services/firebase/auth";
import {
  Bell,
  CalendarDays,
  ChevronDown,
  LogOut,
  Menu,
  Search,
} from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";

const AdminTopbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      showSuccess("Logged out successfully.");
      navigate("/login");
    } catch (error) {
      console.error(error);
      showError("Failed to logout.");
    }
  };

  return (
    <header
      className="
        sticky top-0 z-30
        flex h-[72px] items-center justify-between
        border-b border-[#F2E4E7]
        bg-white
        px-3 shadow-[0_4px_18px_rgba(26,26,26,0.04)]
        sm:px-4 md:h-[80px] md:px-6
        lg:h-[86px] lg:px-8
      "
    >
      {/* LEFT */}
      <div className="flex min-w-0 items-center gap-2 sm:gap-4">
        <button
          className="
            flex h-10 w-10 shrink-0 items-center justify-center
            rounded-full text-darkText transition hover:bg-[#FFF1F5]
          "
        >
          <Menu size={22} />
        </button>

        {/* DESKTOP SEARCH */}
        <div
          className="
            hidden h-12 w-[300px] items-center gap-3
            rounded-[14px] border border-[#E8DDE1]
            bg-white px-4 lg:flex xl:w-[380px]
          "
        >
          <Search size={18} className="shrink-0 text-greyText" />

          <input
            type="text"
            placeholder="Search anything..."
            className="
              w-full bg-transparent
              font-body text-sm text-darkText
              outline-none placeholder:text-greyText
            "
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2 sm:gap-3 lg:gap-5">
        {/* MOBILE SEARCH ICON */}
        <button
          className="
            flex h-10 w-10 items-center justify-center
            rounded-full transition hover:bg-[#FFF1F5]
            lg:hidden
          "
        >
          <Search size={18} />
        </button>

        {/* NOTIFICATION */}
        <button
          className="
            relative flex h-10 w-10 items-center justify-center
            rounded-full transition hover:bg-[#FFF1F5]
            md:h-11 md:w-11
          "
        >
          <Bell size={19} />

          <span
            className="
              absolute right-1.5 top-1.5
              flex h-5 w-5 items-center justify-center
              rounded-full bg-[#D95B8C]
              text-[10px] font-bold text-white
            "
          >
            3
          </span>
        </button>

        {/* CALENDAR */}
        <button
          className="
            hidden h-10 w-10 items-center justify-center
            rounded-full transition hover:bg-[#FFF1F5]
            sm:flex md:h-11 md:w-11
          "
        >
          <CalendarDays size={19} />
        </button>

        {/* PROFILE */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div
            className="
              flex h-10 w-10 shrink-0 items-center justify-center
              rounded-full bg-[#B76E79]
              font-body text-sm font-semibold text-white
              md:h-11 md:w-11
            "
          >
            M
          </div>

          <div className="hidden xl:block">
            <p className="font-body text-sm font-semibold text-darkText">
              Mehwish
            </p>
            <p className="font-body text-xs text-greyText">Admin</p>
          </div>

          <button
            onClick={handleLogout}
            className="hidden rounded-full p-2 transition hover:bg-[#FFF1F5] md:block"
            title="Logout"
          >
            <ChevronDown size={18} />
          </button>

          {/* MOBILE LOGOUT */}
          <button
            onClick={handleLogout}
            className="rounded-full p-2 transition hover:bg-[#FFF1F5] md:hidden"
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminTopbar;