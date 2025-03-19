import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const ProtectedRoute = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-10 h-10 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
    </div>
  </div>; 

  return user ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
