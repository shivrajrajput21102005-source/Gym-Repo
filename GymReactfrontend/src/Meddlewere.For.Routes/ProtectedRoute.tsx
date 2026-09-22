import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../AuthProvider";

function ProtectedRoute() {
  const { user } = useAuth();
  console.log("protexted routes");
  // console.log("user of protectedrouted", user);
  return user ? <Outlet /> : <Navigate to="/login" />;
}
export default ProtectedRoute;
