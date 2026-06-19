import {
  useContext,
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { api } from "./Api";
// import axios from "axios";
// axios.defaults.withCredentials = true;
interface User {
  _id: string;
  email: string;
  userName: string;
  password: string;
  role: string;
}
type CR = {
  email: string;
};

type loginParaProp = {
  email: string;
  password: string;
};
type loginReturnProp = {
  success: boolean;
  message: string | null;
};
type loginProp = (cradiental: loginParaProp) => Promise<loginReturnProp>;
type signup = (cr: CR) => Promise<loginReturnProp>;
type logoutProp = () => Promise<loginReturnProp>;

type AuthContextProp = {
  login: loginProp;
  logout: logoutProp;
  user: User | null;
  signup: signup;
  loading: boolean;
};
const AuthContext = createContext<AuthContextProp | null>(null);
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("auth must be prod");
  }
  return context;
};
type AuthProviderProp = {
  children: ReactNode;
};
export const AuthProvider = ({ children }: AuthProviderProp) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/user", { withCredentials: true });
        if (res.data.user) {
          console.log("setuser1", user);
          setUser(res.data.user);
          console.log("setuser2", user);
        }
        console.log("first fetch", user);
        console.log("first fetch 1", res.data.user, res.data.success);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
        console.log("loading false");
      }
    };
    fetchUser();
  }, []);
  console.log("user3", user);
  const login: loginProp = async (cradiental) => {
    try {
      const res = await api.post("/login", cradiental, {
        withCredentials: true,
      });
      setUser(res.data.user);

      return { success: true, message: "login successfull" };
    } catch (err: any) {
      // if (err.responce) {
      throw {
        success: false,
        message: err?.response?.data?.code || "NETWORK_ERROR",
      };
      // } else {
      //   return { success: false, message: "something deff" };
      // }
    }
  };
  //   const logout = async()
  // console.log("signup1", user);

  const signup: signup = async (cr) => {
    try {
      const res = await api.post("/signup", cr, { withCredentials: true });
      setUser(res.data.user);
      console.log("signup2", user);

      return { success: true, message: "signupsucess" };
    } catch (err: any) {
      // if (err.responce) {
      throw {
        success: false,
        message: err.response.data.code,
      };
      // }
      // else {
      //   return { success: false, message: "Network Error Try again" };
      // }
    }
  };
  const logout: logoutProp = async () => {
    try {
      const lo = await api.post("/logout", {}, { withCredentials: true });
      console.log("logout auth", lo);
      setUser(null);
      return {
        success: true,
        message: "logout success",
      };
    } catch (err: any) {
      return {
        success: false,
        message: err.response.data.code,
      };
    }
  };

  return (
    <AuthContext.Provider value={{ login, logout, user, loading, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
