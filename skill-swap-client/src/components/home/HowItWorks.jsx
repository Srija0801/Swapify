import { Users, BookOpen, Shield } from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Connect with Experts',
    description: 'Find skilled individuals ready to share expertise',
  },
  {
    icon: BookOpen,
    title: 'Learn & Teach',
    description: 'Exchange skills without money',
  },
  {
    icon: Shield,
    title: 'Safe & Verified',
    description: 'Verified members with reviews',
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How Swapify Works</h2>
            <p className="text-xl text-gray-600">Get started in three simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex p-6 bg-emerald-100 rounded-2xl mb-6 group-hover:bg-emerald-600 transition-colors">
                  <feature.icon className="w-8 h-8 text-emerald-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
  );
}
