import { useState } from "react";
import { registerUser } from "../../services/firebase/auth";
import { createUserProfile } from "../../services/firebase/firestore";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // create function first
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // create auth user
      const userCredential = await registerUser(email, password);

      // save in firestore
      await createUserProfile(userCredential.user.uid, {
        email: email,
        role: "user",
        createdAt: new Date(),
      });

      alert("Registration successful");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9E4E0] flex items-center justify-center p-6">
      <form
        onSubmit={handleRegister}
        className="bg-white w-full max-w-[420px] rounded-[20px] p-8 shadow-[0_8px_20px_rgba(0,0,0,0.08)]"
      >
        <h1 className="font-['Playfair_Display'] text-[36px] text-[#1A1A1A] mb-6">
          Register
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
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;