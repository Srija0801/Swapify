import { User, LogOut, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";



export default function DashboardHeader() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const userId = user?._id;

  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <svg width="38" height="38" viewBox="0 0 200 200">
              <path
                fill="#24a7a0"
                d="M20 100 L80 60 L80 85 L130 85 L130 115 L80 115 L80 140 Z"
              />
              <path
                fill="#1b2945"
                d="M180 100 L120 60 L120 85 L70 85 L70 115 L120 115 L120 140 Z"
              />
            </svg>
            <h1 className="text-3xl font-bold text-[#1b2945]">Swapify</h1>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-6">
            <button
              onClick={() => navigate("/browse-skills")}
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Browse Skills
            </button>

            <button
              onClick={() => navigate("/requests")}
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Requests
            </button>

            <button
              onClick={() => navigate("/setup-profile")}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <Settings className="w-5 h-5" />
              <span>Profile</span>
            </button>

            {/* Avatar */}
            <div className="flex items-center space-x-2 border-l pl-6">
              <img
                src={
                  user?.avatar_url ||
                  `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`
                }
                alt="Avatar"
                className="w-8 h-8 rounded-full border"
              />
              <span className="text-sm text-gray-700">
                {user?.name}
              </span>
            </div>

            {/* Logout */}
            <button
              onClick={() => {
                signOut();
                navigate("/login");
              }}
              className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
