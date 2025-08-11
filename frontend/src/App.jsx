import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Services from "./pages/services";
import Navbar from "../components/navbar";
import Profile from "./pages/Profile";


function App() {
  return (
    <>
  
    <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/services" element={<Services />} />
          <Route path="/profile" element={<Profile/>} />

        </Routes>
      </Router>

      
    </>
  );
}

export default App;
