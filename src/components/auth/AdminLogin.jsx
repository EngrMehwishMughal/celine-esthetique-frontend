import { useState } from "react";
import { loginUser } from "../../services/firebase/auth";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAdminLogin = async (e) => {
    e.preventDefault();

    try {
      await loginUser(email, password);

      // later check admin role from firestore
      alert("Admin Login Successful");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9E4E0]">
      <form
        onSubmit={handleAdminLogin}
        className="bg-white p-8 rounded-[20px] w-[420px]"
      >
        <h1 className="text-[36px] mb-6">Admin Login</h1>

        <input
          type="email"
          placeholder="Admin Email"
          className="w-full border p-3 mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 mb-6"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-[#D4AF37] py-3 rounded-full">
          Login as Admin
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;