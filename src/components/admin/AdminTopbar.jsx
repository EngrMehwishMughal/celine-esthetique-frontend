import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/firebase/auth";
import AdminButton from "./AdminButton";
import { showSuccess, showError } from "../../utils/toast";

const AdminTopbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      showSuccess("Logged out successfully.");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      showError("Failed to logout.");
    }
  };

  return (
    <header className="flex h-[72px] items-center justify-between border-b border-softPink bg-white px-4 md:px-6 lg:px-8">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-darkText md:text-3xl">
          Dashboard
        </h1>

        <p className="hidden font-body text-sm text-greyText sm:block">
          Welcome back to Celine Esthétique admin panel.
        </p>
      </div>

      <AdminButton
        text="Logout"
        variant="success"
        onClick={handleLogout}
      />
    </header>
  );
};

export default AdminTopbar;