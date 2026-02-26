import { Routes, Route } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import AdminUsers from "./AdminUsers";
import AdminRequests from "./AdminRequests";

export default function AdminDashboard({ setIsAuth }) {
  const logout = () => {
    localStorage.removeItem("adminToken");
    setIsAuth(false);
  };

  return (
    <AdminLayout logout={logout}>
      <Routes>
        <Route path="users" element={<AdminUsers />} />
        <Route path="requests" element={<AdminRequests />} />
      </Routes>
    </AdminLayout>
  );
}
