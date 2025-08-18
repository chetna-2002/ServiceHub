import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data:", error);
        setUser(null);
      }
    }
  }, []);

  // Public Home Page (No user logged in)
  if (!user) {
    return (
      <div className="p-6 bg-[#D2D0A0] text-center">
        <h1 className="text-3xl font-bold">Welcome to ServiceHub</h1>
        <p className="mt-2 text-gray-600">
          Find and book the best local services easily.
        </p>
        <div className="mt-4">
          <Link
            to="/login"
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Sign Up
          </Link>
        </div>
      </div>
    );
  }

  // Customer Home Page
  if (user.role === "customer") {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Hi {user.name} 👋</h1>
        <p className="text-gray-600">Find and book services near you.</p>
        <Link
          to="/services"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4 inline-block"
        >
          Browse Services
        </Link>
      </div>
    );
  }

  // Provider Home Page
  if (user.role === "provider") {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Hi {user.name} 👋</h1>
        <p className="text-gray-600">Manage your services and bookings.</p>
        <div className="mt-4">
          <Link
            to="/my-services"
            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
          >
            My Services
          </Link>
          <Link
            to="/bookings"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            View Bookings
          </Link>
        </div>
      </div>
    );
  }

  return null;
};

export default Home;
 