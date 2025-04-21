import "./App.css";
import { ToastContainer } from 'react-toastify';
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
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute
import SeachResult from "./components/SeachResult";
import ErrorBoundary from "./components/ErrorBoundary";
import PolicyTabs from "./components/PolicyTabs";

function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastContainer position="top-center" containerStyle={{ top: 60 }} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/searchresult" element={<SeachResult />} />
          <Route path="/policies" element={<PolicyTabs />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/payment" element={<Payment />} />
          </Route>
        </Routes>

      </AuthProvider>
    </Router>
  );
}

export default App;
