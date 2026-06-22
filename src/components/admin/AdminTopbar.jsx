import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/firebase/auth";

const AdminTopbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  return (
    <div className="h-[72px] bg-white border-b flex items-center justify-between px-8">
      <h1 className="font-['Playfair_Display'] text-[30px] text-[#1A1A1A]">
        Dashboard
      </h1>

      <button
        onClick={handleLogout}
        className="bg-[#D4AF37] text-[#1A1A1A] px-7 py-3 rounded-full font-['Montserrat'] text-[14px] font-semibold"
      >
        Logout
      </button>
    </div>
  );
};

export default AdminTopbar;