import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Services from "./pages/services";
import Profile from './pages/Profile'
import LandingPage from "./pages/Landing";


function App() {
  return (
    <>
  
    <Router>
    
      
        <Routes>
          <Route path="/" element={<LandingPage />} />
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
