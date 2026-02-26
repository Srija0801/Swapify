import { ArrowRight } from 'lucide-react';
import  Navbar  from '../components/layouts/Navbar';
import {useState,useEffect} from 'react';
import {  useNavigate } from 'react-router-dom';
import AboutSection from '../components/home/AboutSection';
import Footer from '../components/home/Footer';
import SkillsSection from '../components/home/SkillsSection';
import HowItWorks from '../components/home/HowItWorks';



const stats = [
  { value: '50K+', label: 'Active Members' },
  { value: '200K+', label: 'Skills Exchanged' },
  { value: '95%', label: 'Satisfaction Rate' },
];


function Homepage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const storedUser = localStorage.getItem('current_user');
  if (storedUser) {
    try {
      setUser(JSON.parse(storedUser));
    } catch (e) {
      console.error('Failed to parse user:', e);
      setUser(null);
    }
  }
  setLoading(false);
}, []);

if (loading) return null; // or a spinner

  
   
  return (
    <div className="min-h-screen bg-white">
      <Navbar user={user}/>


      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mt-10 mb-8 leading-tight">
            Trade Skills,
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {' '}Not Money
            </span>
          </h1>

          <p className="text-xl text-gray-600 md:pt-5 max-w-3xl mx-auto">
            Connect with people in your community to exchange skills. Teach what you know,
            learn what you need, all without spending a dime.
          </p>

          <div className="flex justify-center p-10">
             <button onClick={() => navigate(user ? '/dashboard' : '/signup')} className="group px-8 py-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all hover:shadow-xl flex items-center justify-center space-x-2 text-lg font-medium">
                 <span>Start Swapping</span>
                 <ArrowRight className="w-5 h-5 ml-2" />
             </button>
          </div>

          <div className="grid grid-cols-3 gap-8 mt-10 max-w-2xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SkillsSection />
      <HowItWorks />
      <AboutSection />
      <Footer />
    </div>
  );
}

export default Homepage;
