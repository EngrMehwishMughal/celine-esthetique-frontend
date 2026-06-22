import { useState } from "react";
import { loginUser } from "../../services/firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();   // keep here

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await loginUser(email, password);
      alert("Login successful");
      navigate("/admin");   // move inside try block
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9E4E0] flex items-center justify-center p-6">
      <form
        onSubmit={handleLogin}
        className="bg-white w-full max-w-[420px] rounded-[20px] p-8 shadow-[0_8px_20px_rgba(0,0,0,0.08)]"
      >
        <h1 className="font-['Playfair_Display'] text-[36px] text-[#1A1A1A] mb-6">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border border-[#F9E4E0] rounded-[12px] px-4 py-3 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border border-[#F9E4E0] rounded-[12px] px-4 py-3 mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-[#D4AF37] text-[#1A1A1A] px-7 py-3 rounded-full font-semibold">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;