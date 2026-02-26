import { Link } from "react-router-dom";
import { useAuth } from "../../AuthContext";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <div className="h-auto">
      <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Logo */}
            <div className="flex items-center space-x-2">
               <svg width="38" height="38" viewBox="0 0 200 200">
                <path fill="#24a7a0" d="M20 100 L80 60 L80 85 L130 85 L130 115 L80 115 L80 140 Z" />
                <path fill="#1b2945" d="M180 100 L120 60 L120 85 L70 85 L70 115 L120 115 L120 140 Z" />
               </svg>
              <h1 className="text-3xl font-bold text-[#1b2945]">Swapify</h1>
            </div>

            {/* Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#how">How it Works</a>
              <a href="#skills">Browse Skills</a>
              <a href="#about">About</a>

              {user ? (
                <Link
                  to="/dashboard"
                  className="px-4 py-2 text-emerald-600"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/login" className="px-4 py-2 text-emerald-600">
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="px-6 py-2 bg-emerald-600 text-white rounded-lg"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>

          </div>
        </div>
      </nav>
    </div>
  );
}
