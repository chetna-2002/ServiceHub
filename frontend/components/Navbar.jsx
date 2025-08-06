import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-[#537D5D] text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">ServiceHub</Link>

        <div className="space-x-4">
          <Link to="/" className="hover:text-yellow-400">Home</Link>
          <Link to="/services" className="hover:text-yellow-400">Services</Link>
          <Link to="/login" className="hover:text-yellow-400">Login</Link>
          <Link to="/register" className="hover:text-yellow-400">Register</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
