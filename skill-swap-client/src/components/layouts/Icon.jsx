import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Icon({ showBack = false, backTo = -1 }) {
  const navigate = useNavigate();

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4">

        <div className="flex items-center gap-2">
          <svg width="38" height="38" viewBox="0 0 200 200">
            <path fill="#24a7a0" d="M20 100 L80 60 L80 85 L130 85 L130 115 L80 115 L80 140 Z" />
            <path fill="#1b2945" d="M180 100 L120 60 L120 85 L70 85 L70 115 L120 115 L120 140 Z" />
          </svg>
          <Link to="/"><h1 className="text-3xl font-bold text-[#1b2945]" >Swapify</h1></Link>
        </div>

        {showBack && (
          <button
            onClick={() => navigate(backTo)}
            className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">Back</span>
          </button>
        )}
      </div>
    </nav>
  );
}
