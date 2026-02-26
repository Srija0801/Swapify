import { useEffect, useState } from "react";
import adminAxios from "../api/adminAxios";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [form, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    adminAxios.get("/users").then((res) => setUsers(res.data));
  }, []);

  const toggleBlock = async (id) => {
    await adminAxios.patch(`/users/${id}/block`);
    setUsers((prev) =>
      prev.map((u) =>
        u._id === id ? { ...u, isBlocked: !u.isBlocked } : u
      )
    );
  };

  const handleAddUser = async () => {
    try {
      const res = await adminAxios.post("/users", form);
      setUsers((prev) => [...prev, res.data]);
      setShowAdd(false);
      setFormData({ name: "", email: "", password: "" });
    } catch (err) {
      alert(err.response?.data?.message || "Error adding user");
    }
  };

  return (
    <>
      {/* HEADER */}
      <div className="flex items-center justify-between m-4">
        <h2 className="text-3xl font-extrabold text-emerald-700 drop-shadow">
          Users
        </h2>

        <button
          onClick={() => setShowAdd(true)}
          className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700"
        >
          + Add User
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-t">
                <td className="p-3">{u.name}</td>
                <td>{u.email}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      u.isBlocked
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {u.isBlocked ? "Blocked" : "Active"}
                  </span>
                </td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => toggleBlock(u._id)}
                    className={`px-4 py-1 rounded text-white ${
                      u.isBlocked ? "bg-emerald-600" : "bg-red-600"
                    }`}
                  >
                    {u.isBlocked ? "Unblock" : "Block"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ADD USER MODAL */}
      {showAdd && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-96 shadow-lg">
            <h3 className="text-xl font-bold mb-4">Add User</h3>

            <input
              placeholder="Name"
              value={form.name}
              className="border p-2 w-full mb-3"
              onChange={(e) =>
                setFormData({ ...form, name: e.target.value })
              }
            />

            <input
              placeholder="Email"
              value={form.email}
              className="border p-2 w-full mb-3"
              onChange={(e) =>
                setFormData({ ...form, email: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Password"
              value={form.password}
              className="border p-2 w-full mb-3"
              onChange={(e) =>
                setFormData({ ...form, password: e.target.value })
              }
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowAdd(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleAddUser}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
