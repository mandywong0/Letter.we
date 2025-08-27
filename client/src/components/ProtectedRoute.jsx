import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token"); // or sessionStorage, or context maybe change to cookies in the future
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  let isExpired = true;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    isExpired = payload.exp * 1000 < Date.now();
  } catch (err) {
    isExpired = true;
  }
  
  if (isExpired) return <Navigate to="/login" replace />;

  return children;
}