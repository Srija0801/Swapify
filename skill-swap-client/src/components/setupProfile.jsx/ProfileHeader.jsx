export default function ProfileHeader({ avatarUrl, setAvatarUrl, bio, setBio, userId }) {
  return (
    <>
      <div>
        <label className="block text-sm font-medium mb-2">Profile Photo</label>
        <div className="flex items-center space-x-4">
          <img
            src={
              avatarUrl ||
              `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`
            }
            className="w-16 h-16 rounded-full border"
          />
          <input
            type="url"
            placeholder="Image URL (optional)"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Bio</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={4}
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="Tell something about yourself..."
        />
      </div>
    </>
  );
}
