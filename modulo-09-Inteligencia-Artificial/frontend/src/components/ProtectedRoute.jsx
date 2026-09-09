import { useAuthStore } from "../store/authStore";
import { Navigate } from "react-router";

export function ProtectedRoute({ children, redirectTo = "/login" }) {
  const { isLoggedIn } = useAuthStore();

  if (!isLoggedIn) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
}
