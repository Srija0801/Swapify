export default function BioSection({ bio, setBio }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Bio
      </label>

      <textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Tell other users about yourself..."
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
        rows={4}
      />
    </div>
  );
}