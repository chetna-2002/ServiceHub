import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Navbar from "../components/Navbar";
import Provider from './pages/Provider';
import Customer from './pages/Customer'
// import Profile from "./pages/Profile";


const App = () => {
  return (
    <>
    
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/profile" element={<Profile/>} /> */}
        <Route path="/customer" element={<Customer />} />
        <Route path="/provider" element={<Provider />} />
      </Routes>

    </Router>
      
    </>
  );
};
export default App;

