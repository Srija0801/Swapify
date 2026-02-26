export default function LearningSkills({ skills }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Wants to Learn
      </h2>

      {skills.length > 0 ? (
        <div className="space-y-4">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="p-4 bg-teal-50 rounded-lg border border-teal-200"
            >
              <h3 className="font-semibold text-gray-900">
                {skill.name}
              </h3>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No learning skills yet</p>
      )}
    </div>
  );
}
