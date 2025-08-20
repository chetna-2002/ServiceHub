// src/pages/HomePage.jsx
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center h-screen bg-[#7A85C1] text-white">
        <h1 className="text-5xl font-bold mb-6">Welcome to ServiceHub</h1>
        <p className="text-lg max-w-xl text-center mb-8">
          Your one-stop platform to connect with trusted local service providers.
          From plumbers to tutors, we bring everything to your fingertips.
        </p>
        <div className="space-x-4">
          <Link
            to="/register"
            className="px-6 py-3 bg-white text-blue-600 rounded-lg shadow-md hover:bg-gray-100 transition"
          >
            Get Started
          </Link>
         
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-6 md:px-16 bg-[#B2B0E8] text-gray-800">
        <h2 className="text-3xl font-bold text-center mb-8">Why ServiceHub?</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lg mb-4">
              ServiceHub connects you with reliable and verified service providers 
              in your area. Whether you need home repairs, tutoring, or professional 
              help, we make it simple and hassle-free.
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Easy booking & hassle-free scheduling</li>
              <li>Verified service providers</li>
              <li>Secure online payments</li>
              <li>Ratings and reviews to guide your choice</li>
            </ul>
          </div>
          <div>
           
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-[#B2B0E8] px-6 md:px-16">
        <h2 className="text-3xl font-bold text-center mb-10">Our Services</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-xl shadow-md text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3068/3068210.png"
              alt="Plumbing"
              className="w-20 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Plumbing</h3>
            <p>Quick and reliable plumbing services at your doorstep.</p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-md text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2920/2920277.png"
              alt="Tutoring"
              className="w-20 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Tutoring</h3>
            <p>Expert tutors to help you excel in academics and skills.</p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-md text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
              alt="Cleaning"
              className="w-20 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Cleaning</h3>
            <p>Professional cleaning services for homes and offices.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
