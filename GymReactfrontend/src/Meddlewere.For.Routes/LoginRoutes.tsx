import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../AuthProvider";

const LoginRoutes = () => {
  const { user } = useAuth();
  return user ? <Navigate to="/" /> : <Outlet />;
};

export default LoginRoutes;
