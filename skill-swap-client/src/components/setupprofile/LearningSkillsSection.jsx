import { X } from "lucide-react";

export default function LearningSkillsSection({
  allSkills,
  learningSkills,
  setLearningSkills,
  searchLearning,
  setSearchLearning,
  showLearningDropdown,
  setShowLearningDropdown,
}) {
  const filteredLearningSkills = allSkills.filter(
    (s) =>
      s.skill &&
      s.skill.toLowerCase().includes(searchLearning.toLowerCase()) &&
      !learningSkills.find((ls) => ls._id === s._id)
  );

  const addLearningSkill = (skill) => {
    if (!learningSkills.find((s) => s._id === skill._id)) {
      setLearningSkills([...learningSkills, skill]);
    }
    setSearchLearning("");
    setShowLearningDropdown(false);
  };

  const removeLearningSkill = (skillId) => {
    setLearningSkills(
      learningSkills.filter((s) => s._id !== skillId)
    );
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Skills You Want to Learn
      </label>

      <input
        type="text"
        value={searchLearning}
        onChange={(e) => setSearchLearning(e.target.value)}
        onFocus={() => setShowLearningDropdown(true)}
        placeholder="Search skills..."
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
      />

      {showLearningDropdown && filteredLearningSkills.length > 0 && (
        <div className="border rounded-lg mt-2 max-h-40 overflow-y-auto bg-white shadow">
          {filteredLearningSkills.map((skill) => (
            <div
              key={skill._id}
              onClick={() => addLearningSkill(skill)}
              className="px-4 py-2 hover:bg-teal-50 cursor-pointer"
            >
              {skill.skill}
            </div>
          ))}
        </div>
      )}

      {learningSkills.length > 0 && (
        <div className="space-y-3 mt-4">
          {learningSkills.map((skill) => (
            <div
              key={skill._id}
              className="flex items-center justify-between p-3 bg-teal-50 rounded-lg border border-teal-200"
            >
              <div className="font-medium text-gray-900">
                {skill.skill}
              </div>

              <button
                type="button"
                onClick={() =>
                  removeLearningSkill(skill._id)
                }
                className="p-1 hover:bg-red-100 rounded"
              >
                <X className="w-5 h-5 text-red-600" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}