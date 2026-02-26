import { Users, Award, Clock } from 'lucide-react';

export default function AboutSection() {
  return (
     <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lg text-gray-600 mb-6">
              Swapify was founded on a simple belief: everyone has something valuable to teach,
              and everyone has something they want to learn.
            </p>

            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <Users className="w-6 h-6 text-emerald-600 mt-1" />
                <div>
                  <h4 className="font-semibold">Community First</h4>
                  <p className="text-gray-600">We prioritize genuine connections</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Award className="w-6 h-6 text-emerald-600 mt-1" />
                <div>
                  <h4 className="font-semibold">Quality & Trust</h4>
                  <p className="text-gray-600">Verified members & reviews</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Clock className="w-6 h-6 text-emerald-600 mt-1" />
                <div>
                  <h4 className="font-semibold">Flexible Learning</h4>
                  <p className="text-gray-600">Learn at your own pace</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl p-12 text-center">
            <div className="text-5xl font-bold text-emerald-600 mb-2">Founded</div>
            <p className="text-gray-700 mb-8">2023</p>

            <div className="border-t border-emerald-300 pt-8">
              <div className="text-5xl font-bold text-emerald-600 mb-2">Founder</div>
              <p className="text-gray-700">Thodenga Srija</p>
            </div>
          </div>
        </div>
      </section>
  );
}
