import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isAuth, setAuth] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");

    if (token) {
      setAuth(true);
      setRole(userRole);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setAuth(false);
    setRole(null);
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Side - Logo */}
        <div className="text-xl font-bold">
          <Link to="/">ServiceHub</Link>
        </div>

        {/* Right Side - Links */}
        <div className="space-x-4">
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/about">About</Link>

          {/* Role-based links */}
          {role === "provider" && <Link to="/provider-dashboard">Provider Dashboard</Link>}
          {role === "customer" && <Link to="/customer-dashboard">Customer Dashboard</Link>}

          {/* Auth Links */}
          {!isAuth ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded-md hover:bg-red-700"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
