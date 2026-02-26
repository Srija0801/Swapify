import { Check, X } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function RequestCard({
  request,
  type,
  currentUser,
  onAccept,
  onReject,
  onChat,
}) {

  
      const user = type === "incoming" ? request.sender : currentUser;    

  return (
    <div className="p-6 border border-gray-200 rounded-lg hover:border-emerald-300 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4 flex-1">
          <img
            src={user?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?._id}`}
            alt={user?.name}
            className="w-12 h-12 rounded-full border-2 border-emerald-200"
          />

          <div>
            <h3 className="font-bold text-gray-900">
              {type === "outgoing"
                ? "You want to learn"
                : `${user?.name} wants to learn`}{" "}
              {request.skill?.skill}
            </h3>

            <p className="text-sm text-gray-500">
              {request.createdAt
                ? new Date(request.createdAt).toLocaleDateString()
                : "—"}
            </p>
          </div>
        </div>

        <StatusBadge status={request.status} />
      </div>

      {request.message && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-700">{request.message}</p>
        </div>
      )}

      {type === "incoming" && request.status === "pending" && (
        <div className="flex space-x-3">
          <button
            onClick={() => onAccept(request._id)}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            <Check className="w-4 h-4" />
            <span>Accept</span>
          </button>

          <button
            onClick={() => onReject(request._id)}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
          >
            <X className="w-4 h-4" />
            <span>Decline</span>
          </button>
        </div>
      )}

      {request.status === "accepted" && (
        <button
          onClick={() => onChat(request._id)}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
        >
          Open Chat
        </button>
      )}
    </div>
  );
}
