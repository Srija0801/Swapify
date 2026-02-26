import { Upload } from "lucide-react";

export default function AvatarUpload({ user, avatarUrl, handleAvatarChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-4">
        Profile Photo
      </label>

      <div className="flex items-center space-x-4">
        <img
          src={
            avatarUrl ||
            `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.id}`
          }
          alt="Avatar"
          className="w-16 h-16 rounded-full border-2 border-emerald-200"
        />

        <label className="flex items-center px-4 py-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200">
          <Upload className="w-5 h-5 mr-2" /> Upload
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </label>
      </div>
    </div>
  );
}