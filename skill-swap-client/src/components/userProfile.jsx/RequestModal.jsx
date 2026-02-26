export default function RequestModal({
  skills,
  selectedSkill,
  setSelectedSkill,
  message,
  setMessage,
  onClose,
  onSend,
  loading,
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Request to Learn
        </h2>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Skill
          </label>

          <select
            value={selectedSkill?.id || ""}
            onChange={(e) =>
              setSelectedSkill(
                skills.find(s => s.id === e.target.value)
              )
            }
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
          >
            <option value="">Choose a skill</option>
            {skills.map((skill) => (
              <option key={skill.id} value={skill.id}>
                {skill.name}
              </option>
            ))}
          </select>
        </div>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          placeholder="Tell them why you'd like to learn..."
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 resize-none mb-6"
        />

        <div className="flex space-x-4">
          <button
            onClick={onClose}
            className="flex-1 border px-4 py-2 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={onSend}
            disabled={!selectedSkill || loading}
            className="flex-1 bg-emerald-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Request"}
          </button>
        </div>
      </div>
    </div>
  );
}
