import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

function PublicRoutes() {
  const { user } = useAuth();
  // console.log("user of publicrouted", user);
  console.log("public routges routes");

  return user ? <Navigate to="/" replace /> : <Outlet />;
}
export default PublicRoutes;
