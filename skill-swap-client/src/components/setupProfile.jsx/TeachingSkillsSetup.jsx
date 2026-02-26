import { Star, X } from 'lucide-react';

export default function TeachingSkills({
  allSkills,
  teachingSkills,
  setTeachingSkills,
  searchTeaching,
  setSearchTeaching,
  showTeachingDropdown,
  setShowTeachingDropdown,
}) {
  const addSkill = (skill) => {
    if (!teachingSkills.find(s => s.skill.id === skill.id)) {
      setTeachingSkills([...teachingSkills, { skill, proficiency: 3 }]);
    }
    setSearchTeaching('');
    setShowTeachingDropdown(false);
  };

  const updateProficiency = (skillId, proficiency) => {
    setTeachingSkills(
      teachingSkills.map(s =>
        s.skill.id === skillId ? { ...s, proficiency } : s
      )
    );
  };

  const removeSkill = (skillId) => {
    setTeachingSkills(teachingSkills.filter(s => s.skill.id !== skillId));
  };

  const filtered = allSkills.filter(
    s =>
      s.name.toLowerCase().includes(searchTeaching.toLowerCase()) &&
      !teachingSkills.find(ts => ts.skill.id === s.id)
  );

  return (
    <div>
      <label className="block font-medium mb-2">Skills You Can Teach</label>

      <input
        value={searchTeaching}
        onChange={e => setSearchTeaching(e.target.value)}
        onFocus={() => setShowTeachingDropdown(true)}
        className="w-full px-4 py-2 border rounded-lg"
        placeholder="Search skills..."
      />

      {showTeachingDropdown && (
        <div className="border mt-1 rounded-lg bg-white">
          {filtered.map(skill => (
            <button
              key={skill.id}
              type="button"
              onClick={() => addSkill(skill)}
              className="block w-full text-left px-4 py-2 hover:bg-emerald-50"
            >
              {skill.name}
            </button>
          ))}
        </div>
      )}

      {teachingSkills.map(({ skill, proficiency }) => (
        <div
          key={skill.id}
          className="flex justify-between items-center mt-2 p-2 bg-emerald-50 rounded"
        >
          <span>{skill.name}</span>

          <div className="flex items-center">
            {[1,2,3,4,5].map(i => (
              <Star
                key={i}
                onClick={() => updateProficiency(skill.id, i)}
                className={`w-4 h-4 cursor-pointer ${
                  i <= proficiency ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                }`}
              />
            ))}

            <X
              onClick={() => removeSkill(skill.id)}
              className="w-5 h-5 ml-2 text-red-500 cursor-pointer"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
