import "./App.css";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from './context/authContext';
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin";
import Profile from "./components/Profile";
import Packages from "./Pages/Packages";
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import Payment from "./components/Payment";


function App() {
  return (

    <>
     <AuthProvider>
      <ToastContainer position="top-center" containerStyle={{ top: 60 }} />
   
      <Router>
        <Routes>
      
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </Router>
      </AuthProvider>
    </>

  );
}

export default App;
