import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const savedRole = localStorage.getItem("role");

  // Not logged in
  if (!savedRole) {
    return <Navigate to="/" replace />;
  }

  // Role mismatch
  if (role && savedRole !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
