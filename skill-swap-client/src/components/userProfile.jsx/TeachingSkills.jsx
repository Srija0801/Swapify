import { Star } from "lucide-react";

export default function TeachingSkills({ skills }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Can Teach
      </h2>

      {skills.length > 0 ? (
        <div className="space-y-4">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="p-4 bg-emerald-50 rounded-lg border border-emerald-200"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">
                  {skill.name}
                </h3>

                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={`${skill.id}-${i}`}
                      className={`w-4 h-4 ${
                        i < skill.proficiency
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No teaching skills yet</p>
      )}
    </div>
  );
}
