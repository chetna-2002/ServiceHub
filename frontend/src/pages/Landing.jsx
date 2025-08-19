// LandingPage.jsx
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#537D5D]">
      <h1 className="text-4xl text-white font-bold mb-6">Welcome to ServiceHub</h1>
      <p className="text-lg text-white mb-6">Your one-stop platform to connect customers and service providers.</p>
      <button
        onClick={() => navigate('/register')}
        className="px-2 py-1 text-xl font-bold bg-white text-blue-600 rounded-lg hover:text-blue-800"
      >
        Explore Now 
      </button>
    </div>
  );
}
