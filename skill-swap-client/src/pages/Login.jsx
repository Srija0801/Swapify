import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Mail, Lock } from 'lucide-react';
import Icon from '../components/layouts/Icon';
import { useAuth } from '../AuthContext';

import { userApi } from '../api/userApi';
import userAxios from '../api/userAxios';

export default function Login() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [info,setInfo] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError('');

    if (!formData.email.trim()) {
      setError('Email is required');
      return;
    }
    if (!formData.password) {
      setError('Password is required');
      return;
    }

    setLoading(true);
    const result = await signIn(formData.email, formData.password);

    if (!result.success) {
      setError(result.error || 'Login failed');
      setLoading(false);
    } else {
      navigate('/dashboard');
    }

  };

  const handleForgotPassword = async() =>{
    setError(' ');
    setInfo(' ');


    try{
      setLoading(true);
      const res = await userAxios.post("/auth/forgot-password",{email:formData.email.trim().toLowerCase()});
      setInfo(res.data.message || "Reset link sent to email");

    }catch(err){
      setError(err.response?.data.message || "Failed to reset link");
    }finally{
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <Icon/>
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

          <h1 className="text-3xl font-bold mb-6">Welcome Back</h1>
          <p className="text-gray-600 mb-8"> Sign in to your Swapify account </p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full pl-10 py-2.5 border rounded-lg"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full pl-10 py-2.5 border rounded-lg"
              />
            </div>

            <div className='text-right'>
               <button className='text-sm text-emerald-600 hover:underline' type="button" onClick={handleForgotPassword}>
                Forgot Password
               </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 text-white py-2.5 rounded-lg"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="mt-6 text-center">
            Don’t have an account?{' '}
            <Link to="/signup" className="text-emerald-600 font-medium">
              Sign up
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}
