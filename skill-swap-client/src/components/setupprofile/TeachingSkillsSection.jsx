import { X, Star } from "lucide-react";

export default function TeachingSkillsSection({
  allSkills,
  teachingSkills,
  setTeachingSkills,
  searchTeaching,
  setSearchTeaching,
  showTeachingDropdown,
  setShowTeachingDropdown,
  updateProficiency,
}) {
  const filteredTeachingSkills = allSkills.filter(
    (s) =>
      s.skill &&
      s.skill.toLowerCase().includes(searchTeaching.toLowerCase()) &&
      !teachingSkills.find((ts) => ts.skill._id === s._id)
  );

  const addTeachingSkill = (skill) => {
    if (!teachingSkills.find((s) => s.skill._id === skill._id)) {
      setTeachingSkills([...teachingSkills, { skill, proficiency: 3 }]);
    }
    setSearchTeaching("");
    setShowTeachingDropdown(false);
  };

  const removeTeachingSkill = (skillId) => {
    setTeachingSkills(
      teachingSkills.filter((s) => s.skill._id !== skillId)
    );
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Skills You Can Teach
      </label>

      <input
        type="text"
        value={searchTeaching}
        onChange={(e) => setSearchTeaching(e.target.value)}
        onFocus={() => setShowTeachingDropdown(true)}
        placeholder="Search skills..."
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
      />

      {showTeachingDropdown && filteredTeachingSkills.length > 0 && (
        <div className="border rounded-lg mt-2 max-h-40 overflow-y-auto bg-white shadow">
          {filteredTeachingSkills.map((skill) => (
            <div
              key={skill._id}
              onClick={() => addTeachingSkill(skill)}
              className="px-4 py-2 hover:bg-emerald-50 cursor-pointer"
            >
              {skill.skill}
            </div>
          ))}
        </div>
      )}

      {teachingSkills.length > 0 && (
        <div className="space-y-3 mt-4">
          {teachingSkills.map(({ skill, proficiency }) => (
            <div
              key={skill._id}
              className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg border border-emerald-200"
            >
              <div className="flex-1">
                <div className="font-medium text-gray-900">
                  {skill.skill}
                </div>

                <div className="flex items-center space-x-1 mt-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() =>
                        updateProficiency(skill._id, i)
                      }
                    >
                      <Star
                        className={`w-4 h-4 ${
                          i <= proficiency
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  removeTeachingSkill(skill._id)
                }
                className="ml-3 p-1 hover:bg-red-100 rounded"
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