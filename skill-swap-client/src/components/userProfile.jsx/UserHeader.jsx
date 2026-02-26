import { MessageCircle } from 'lucide-react';

export default function UserHeader({ user, currentUserId, onRequest }) {
  

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
      <div className="flex items-start space-x-6">
        <img src={user.avatar_url ||`https://api.dicebear.com/7.x/avataaars/svg?seed=${user._id}`}  alt={user.name}

          className="w-24 h-24 rounded-full border-4 border-emerald-200"/>

        <div className="flex-1">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {user.name}
          </h1>
          <p className="text-gray-600 text-lg mb-6">{user.bio}</p>

          {currentUserId !== user._id && (
            <button
              onClick={onRequest}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Send Exchange Request</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
