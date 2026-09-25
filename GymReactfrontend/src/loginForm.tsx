// import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "./AuthProvider";
import { toast } from "react-toastify";
import { useState } from "react";
// import SignUpForm from "./SignupForm";
import { Navigate, NavLink } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { BASEURL } from "./Api";

// interface Error {
//   namey: string;
//   passwordy: string;
// }
// type login = {
//   email: string;
//   password: string;
// };

const LoginForm = () => {
  const { login } = useAuth();

  const [emptyField, setEmptyFeild] = useState<string[]>([]);
  const { mutate, error, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      <Navigate to="/" replace />;
      toast.success("Login successfull");
      console.log("login Success", data);
    },
    onError: (error) => {
      // toast.error("Login failed");
      // const message ="Login Failed"
      console.log("login failed", error);
    },
  });

  const [issee, setIssee] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const getFormValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.ChangeEvent) => {
    e.preventDefault();
    if (form.email == "") {
      setEmptyFeild((prev) => [...prev, "Email"]);
      return;
    }
    if (form.password == "") {
      setEmptyFeild((prev) => [...prev, "Password"]);
      return;
    }

    mutate(form);
    setEmptyFeild([]);
  };

  return (
    <div className="w-full flex justify-center md:mt-12 mt-8">
      <div className="w-full max-w-md ">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:space-y-6 space-y-2">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Welcome
            </h1>
            <p className="text-gray-500">Sign in to your account</p>
          </div>
          <div className="md:h-8 h-4 flex items-end justify-center">
            {error && (
              <p className="text-red-500 text-sm font-semibold">
                login failed !, Try again
              </p>
            )}
          </div>
          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Username Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                User Email
              </label>
              <input
                type="text"
                name="email"
                placeholder="Enter your email"
                onChange={getFormValue}
                value={form.email}
                className={`w-full px-4 py-3 rounded-lg border-2   focus:outline-none transition-colors duration-200 text-gray-900 placeholder-gray-400 ${emptyField.includes("Email") ? "focus:border-red-500 border-red-500 " : "border-gray-200 focus:border-blue-500 "}`}
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  onChange={getFormValue}
                  value={form.password}
                  type={issee ? "text" : "password"}
                  placeholder="Enter your password"
                  className={`w-full px-4 py-3 rounded-lg border-2  focus:border-blue-500 focus:outline-none transition-colors duration-200 text-gray-900 placeholder-gray-400 pr-12 ${emptyField.includes("Password") ? "focus:border-red-500 border-red-500 " : "border-gray-200 focus:border-blue-500 "}`}
                />
                <button
                  type="button"
                  onClick={() => setIssee(!issee)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xl hover:scale-110 transition-transform"
                >
                  {issee ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>
            <div className="flex justify-end text-sm text-blue-600 hover:underline">
              <NavLink to="/forgetpassword">Forgot password?</NavLink>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full flex items-center justify-center py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              {isPending ? (
                <div className="w-6 h-6 rounded-full border-gray-50 border-4 border-t-blue-200 animate-spin"></div>
              ) : (
                "Login"
              )}
            </button>
          </form>
      
          <div className="flex justify-center ">
            <button
              className="font-semibold text-sm border-2 border-gray-400 rounded-lg px-4 md:px-6 py-2 bg-gradient-to-r from-red-600 via-yellow-400  via-green-600 to-blue-600 bg-clip-text text-transparent "
              onClick={() =>
                (window.location.href = `${BASEURL}/auth/google`)
              }
            >
              Continue with Google
            </button>
          </div>

          <div className=" flex justify-center text-blue-700">
            <NavLink to="/registration">Create new account</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginForm;
