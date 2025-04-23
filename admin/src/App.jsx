import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import UserManagement from "./pages/UserManagement";
import PackageManagement from "./pages/PackageManagement";
import InquiryManagement from "./pages/InquiryManagement";
import BookingManagement from "./pages/BookingManagement";
import BookingDetails from "./pages/BookingDetails";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/authContext";
import Signin from "./components/Signin";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return <Outlet />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer position="top-center" containerStyle={{ top: 60 }} />
        <Routes>
          {/* Admin Base Path */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Signin />} />

            {/* Protected Admin Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="packages" element={<PackageManagement />} />
              <Route path="inquiries" element={<InquiryManagement />} />
              <Route path="bookings" element={<BookingManagement />} />
              <Route path="bookings/:id" element={<BookingDetails />} />
            </Route>

            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
