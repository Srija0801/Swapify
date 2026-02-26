import { Link } from "react-router-dom";

export default function AdminLayout({ children, logout }) {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className="w-64 bg-emerald-700 text-white p-6">
        <h2 className="text-xl font-bold mb-8">Admin Panel</h2>

        <nav className="space-y-4">
          <Link to="/admin/users" className="block hover:text-emerald-200">
            Users
          </Link>

          <Link to="/admin/requests" className="block hover:text-emerald-200">
            Requests
          </Link>

          <button
            onClick={logout}
            className="mt-10 text-sm text-red-200 hover:text-red-400"
          >
            Logout
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
