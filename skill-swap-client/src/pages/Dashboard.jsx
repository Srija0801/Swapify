import React from 'react';
import {useNavigate} from 'react-router-dom';
import { LogOut, User, Settings } from 'lucide-react';
import {useState,useEffect} from 'react';
import Dashboardheader from '../components/layouts/Dashboardheader';


export default function Dashboard(){
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const userId=user?.id;

    
      useEffect(() => {
        const storedUser = localStorage.getItem('current_user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      }, []);
    
      const handleSignOut = () => {
        localStorage.removeItem('current_user');
        setUser(null);
        navigate('/login');
      };
     return (
    <div className="min-h-screen bg-gray-50">
      <Dashboardheader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome to Swapify</h1>
          <p className="text-xl text-gray-600">Start your skill exchange journey</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">🎓</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Complete Your Profile</h2>
            <p className="text-gray-600 mb-6">Add skills you can teach and want to learn</p>
            <button className="w-full px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
              Edit Profile
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Find Skills</h2>
            <p className="text-gray-600 mb-6">Search and discover new skills to learn</p>
            <button className="w-full px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
              Browse Skills
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">💬</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Messages</h2>
            <p className="text-gray-600 mb-6">Connect and chat with other learners</p>
            <button className="w-full px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
              View Messages
            </button>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Getting Started</h2>
          <ol className="space-y-4">
            <li className="flex items-start space-x-4">
              <span className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-emerald-600 text-white font-bold">1</span>
              <div>
                <h3 className="font-semibold text-gray-900">Set Up Your Profile</h3>
                <p className="text-gray-600">Add your bio, profile photo, and list the skills you can teach</p>
              </div>
            </li>
            <li className="flex items-start space-x-4">
              <span className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-emerald-600 text-white font-bold">2</span>
              <div>
                <h3 className="font-semibold text-gray-900">Add Skills You Want to Learn</h3>
                <p className="text-gray-600">Tell us what new skills you'd like to acquire</p>
              </div>
            </li>
            <li className="flex items-start space-x-4">
              <span className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-emerald-600 text-white font-bold">3</span>
              <div>
                <h3 className="font-semibold text-gray-900">Search for Skills</h3>
                <p className="text-gray-600">Find users who can teach what you want to learn</p>
              </div>
            </li>
            <li className="flex items-start space-x-4">
              <span className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-emerald-600 text-white font-bold">4</span>
              <div>
                <h3 className="font-semibold text-gray-900">Send Request & Connect</h3>
                <p className="text-gray-600">Request to learn and start chatting with potential exchange partners</p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
