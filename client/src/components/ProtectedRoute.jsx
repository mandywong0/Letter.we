import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token"); // or sessionStorage, or context maybe change to cookies in the future
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}