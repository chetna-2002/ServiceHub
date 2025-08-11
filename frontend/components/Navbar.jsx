import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  })();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <nav className="bg-[#537D5D] text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">ServiceHub</Link>

        <div className="space-x-4 flex items-center">
          <Link to="/" className="hover:text-yellow-400">Home</Link>
          <Link to="/services" className="hover:text-yellow-400">Services</Link>

          {token ? (
            <>
              <span className="hover:text-yellow-400">
                Hi, {user?.username || user?.name || "User"}
              </span>
              <button
                onClick={handleLogout}
                className="p-1 hover:bg-[#46694D] rounded-full"
                title="Logout"
              >
                {/* Logout SVG icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6 text-white hover:text-yellow-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                  />
                </svg>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-yellow-400">Login</Link>
              <Link to="/register" className="hover:text-yellow-400">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
