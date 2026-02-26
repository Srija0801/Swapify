import { useState } from "react";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";

export default function AdminPage() {
  const [auth, setAuth] = useState(
    !!localStorage.getItem("adminToken")
  );

  return auth ? (
    <AdminDashboard setIsAuth={setAuth} />
  ) : (
    <AdminLogin setIsAuth={setAuth} />
  );
}
