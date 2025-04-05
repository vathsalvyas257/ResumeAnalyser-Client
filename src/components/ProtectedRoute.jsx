import { Navigate } from "react-router-dom";
import {toast} from "react-hot-toast";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token || !user) return <Navigate to="/login" replace />;

  const userRole = user.role;
  if (!allowedRoles.includes(userRole)) {
    toast.error("You are not authorized to access that page.", {position:"bottom-right", duration:2000});
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
