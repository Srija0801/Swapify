import { useEffect, useState } from "react";
import adminAxios from "../api/adminAxios";

export default function Requests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    adminAxios
      .get("/requests") 
      .then((res) => setRequests(res.data))
      .catch(console.error);
  }, []);

  const cancelRequest = async (id) => {
    await adminAxios.patch(`/requests-cancel/${id}`); 

    setRequests((prev) =>
      prev.map((r) =>
        r._id === id ? { ...r, status: "cancelled" } : r
      )
    );
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Skill Requests</h2>

      <div className="space-y-3">
        {requests.map((r) => (
          <div
            key={r._id}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <p className="font-medium">
                {r.sender?.name} → {r.receiver?.name}
              </p>
              <p className="text-sm text-gray-500">
                Skill: {r.skill?.skill} | Status: {r.status}
              </p>
            </div>

            {r.status !== "cancelled" && (
              <button
                onClick={() => cancelRequest(r._id)}
                className="bg-red-600 text-white px-4 py-1 rounded"
              >
                Cancel
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
