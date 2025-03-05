import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import UserManagement from "./pages/UserManagement";
import PackageManagement from "./pages/PackageManagement";
import InquiryManagement from "./pages/InquiryManagement";
import BookingManagement from "./pages/BookingManagement";

function App() {
  return (
    <Router>


      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/packages" element={<PackageManagement />} />
        <Route path="/inquiries" element={<InquiryManagement />} />
        <Route path="/bookings" element={<BookingManagement />} />
      </Routes>

    </Router>
  );
}

export default App;
