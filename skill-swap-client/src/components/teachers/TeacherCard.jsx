import { Star, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TeacherCard({ teacher }) {
  const navigate = useNavigate();
  const user = teacher.user;

  if (!user) return null;

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex space-x-4">
        <img
          src={
            user.avatar_url ||
            `https://api.dicebear.com/7.x/avataaars/svg?seed=${user._id}`
          }
          alt={user.name}
          className="w-16 h-16 rounded-full"
        />

        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-lg">{user.name}</h3>

            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < (teacher.proficiency || 0)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          <p className="text-sm text-gray-600 mb-3">
            {user.bio || "No bio provided"}
          </p>

          <button
            onClick={() => navigate(`/profile/${user._id}`)}
            className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg"
          >
            <span>View Profile</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
