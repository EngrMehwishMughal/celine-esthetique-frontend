import { useState } from "react";
import { forgotPassword } from "../../services/firebase/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      await forgotPassword(email);
      alert("Password reset email sent");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9E4E0] flex items-center justify-center p-6">
      <form
        onSubmit={handleReset}
        className="bg-white w-full max-w-[420px] rounded-[20px] p-8 shadow-[0_8px_20px_rgba(0,0,0,0.08)]"
      >
        <h1 className="font-['Playfair_Display'] text-[36px] text-[#1A1A1A] mb-6">
          Forgot Password
        </h1>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border border-[#F9E4E0] rounded-[12px] px-4 py-3 mb-6"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="w-full bg-[#D4AF37] text-[#1A1A1A] px-7 py-3 rounded-full font-semibold">
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;