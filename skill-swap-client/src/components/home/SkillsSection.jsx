const skills = [
  { name: 'Design', icon: '🎨' },
  { name: 'Development', icon: '💻' },
  { name: 'Languages', icon: '🌍' },
  { name: 'Music', icon: '🎵' },
  { name: 'Photography', icon: '📸' },
  { name: 'Marketing', icon: '📊' },
  { name: 'Writing', icon: '✍️' },
  { name: 'Cooking', icon: '👨‍🍳' },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular Skill Categories</h2>
            <p className="text-xl text-gray-600">
              Explore thousands of skills across diverse categories
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="group p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 hover:border-emerald-300 hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                  {skill.icon}
                </div>
                <div className="text-lg font-semibold text-gray-900">{skill.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
  );
}
