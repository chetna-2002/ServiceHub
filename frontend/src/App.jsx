import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LandingPage from "./pages/Landing";
import Navbar from "./pages/Navbar";
import Provider from './pages/Provider';
import Customer from './pages/Customer'

function App() {
  const isLoggedIn = localStorage.getItem("token");

  return (
    <Router>
      {/* Show navbar only if logged in */}
      {isLoggedIn && <Navbar />}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/provider" element={<Provider />} />
        <Route path="/customer" element={<Customer />} />

      </Routes>
    </Router>
  );
}

export default App;
