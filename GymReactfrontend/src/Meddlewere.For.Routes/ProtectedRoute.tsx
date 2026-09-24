import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../AuthProvider";

function ProtectedRoute() {
  const { user } = useAuth();
  console.log("protexted routes",window.location.pathname);
  // console.log("user of protectedrouted", user);
  return user ? <Outlet /> : <Navigate to="/login" replace/>;
}
export default ProtectedRoute;
