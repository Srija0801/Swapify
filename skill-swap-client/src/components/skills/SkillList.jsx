export default function SkillList({ skills, selectedSkill, onSelect }) {
  return (
    <div className="space-y-2 max-h-96 overflow-y-auto">
      {skills.map(skill => (
        <button
          key={skill.id}
          onClick={() => onSelect(skill)}
          className={`w-full text-left px-4 py-3 rounded-lg ${
            selectedSkill?.id === skill.id
              ? "bg-emerald-600 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          {skill.name}
        </button>
      ))}
    </div>
  );
}
