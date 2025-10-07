// frontend/src/pages/AdminLogin.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://aestheticartclub-portfolio.onrender.com/auth/login", {
        email,
        password,
      });
      localStorage.setItem("adminToken", res.data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      alert("Invalid login");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black-100">
      <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
      <form className="bg-white p-6 rounded shadow-md" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 mb-3 w-full"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 mb-3 w-full"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
