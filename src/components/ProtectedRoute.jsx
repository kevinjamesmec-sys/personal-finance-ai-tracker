import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (error) {
    user = null;
  }

  return user ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
