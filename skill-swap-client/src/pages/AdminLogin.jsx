import { useState } from "react";
import adminAxios from "../api/adminAxios";

export default function AdminLogin({ setIsAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
const handleLogin = async () => {
  try {
    const res = await adminAxios.post("/login", { email, password });
    console.log("LOGIN RESPONSE:", res.data); // <--- ADD THIS
    if (!res.data.token) throw new Error("No token returned");
    localStorage.setItem("adminToken", res.data.token);
    setIsAuth(true);
  } catch (err) {
    console.error("LOGIN ERROR:", err.response?.data || err.message);
    setError(err.response?.data?.message || "Server error");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Admin Login
        </h1>

        {error && (
          <p className="bg-red-100 text-red-600 p-2 rounded mb-4">
            {error}
          </p>
        )}

        <input
          className="w-full border p-3 rounded mb-4"
          value = {email}
          placeholder="Admin Email"
         onChange={(e) => setEmail(e.target.value.toLowerCase())}
        />

        <input
          type="password"
          value = {password}
          className="w-full border p-3 rounded mb-6"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-emerald-600 text-white py-3 rounded hover:bg-emerald-700"
        >
          Login
        </button>
      </div>
    </div>
  );
}
