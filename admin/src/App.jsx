import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import UserManagement from "./pages/UserManagement";
import PackageManagement from "./pages/PackageManagement";
import InquiryManagement from "./pages/InquiryManagement";
import BookingManagement from "./pages/BookingManagement";
import BookingDetails from "./pages/BookingDetails";
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <Router>
     <ToastContainer position="top-center" containerStyle={{ top: 60 }} />

      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/UserManagement" element={<UserManagement />} />
        <Route path="/packages" element={<PackageManagement />} />
        <Route path="/inquiries" element={<InquiryManagement />} />
        <Route path="/bookings" element={<BookingManagement />} />
        <Route path="/bookings/:id" element={<BookingDetails />} />
      </Routes>

    </Router>
  );
}

export default App;