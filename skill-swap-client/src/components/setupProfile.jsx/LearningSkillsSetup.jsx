import { X } from 'lucide-react';

export default function LearningSkills({
  allSkills,
  learningSkills,
  setLearningSkills,
  searchLearning,
  setSearchLearning,
  showLearningDropdown,
  setShowLearningDropdown,
}) {
  const addSkill = (skill) => {
    if (!learningSkills.find(s => s.id === skill.id)) {
      setLearningSkills([...learningSkills, skill]);
    }
    setSearchLearning('');
    setShowLearningDropdown(false);
  };

  const removeSkill = (skillId) => {
    setLearningSkills(learningSkills.filter(s => s.id !== skillId));
  };

  const filtered = allSkills.filter(
    s =>
      s.name.toLowerCase().includes(searchLearning.toLowerCase()) &&
      !learningSkills.find(ls => ls.id === s.id)
  );


   
  return (
    <div>
      <label className="block font-medium mb-2">Skills You Want to Learn</label>

      <input
        value={searchLearning}
        onChange={e => setSearchLearning(e.target.value)}
        onFocus={() => setShowLearningDropdown(true)}
        className="w-full px-4 py-2 border rounded-lg"
        placeholder="Search skills..."
      />

      {showLearningDropdown && (
        <div className="border mt-1 rounded-lg bg-white">
          {filtered.map(skill => (
            <button
              key={skill.id}
              type="button"
              onClick={() => addSkill(skill)}
              className="block w-full text-left px-4 py-2 hover:bg-teal-50"
            >
              {skill.name}
            </button>
          ))}
        </div>
      )}

      {learningSkills.map(skill => (
        <div
          key={skill.id}
          className="flex justify-between mt-2 p-2 bg-teal-50 rounded"
        >
          <span>{skill.name}</span>
          <X
            onClick={() => removeSkill(skill.id)}
            className="w-5 h-5 text-red-500 cursor-pointer"
          />
        </div>
      ))}
    </div>
  );
}
