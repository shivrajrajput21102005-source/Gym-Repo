import { GoogleLogin } from "@react-oauth/google";
// import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "./AuthProvider";
import { toast } from "react-toastify";
import { useState } from "react";
// import SignUpForm from "./SignupForm";
import { NavLink } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
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
  const { mutate, data,error, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      toast.success("Login successfull");
      console.log("login Success", data);
    },
    onError: (error) => {
      // toast.error("Login failed");
      // const message ="Login Failed"
      console.log("login failed", error);
    },
  });
  // const navigate = useNavigate();
  // const [signup, setSignUp] = useState(false);
  const [issee, setIssee] = useState(false);
  // const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  // const loginGoogle = useGoogleLogin({
  //   onSuccess: (token) => console.log(token),
  // });

  const getFormValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.ChangeEvent) => {
    e.preventDefault();

    // console.log("resultLogin 1");
    mutate(form);
    // const result = await login(form);
    // console.log("resultLogin", result.message);
    // if (!result.success) {
    //   setError(result.message);
    // }

    // console.log(error);
    // if (!isPending) {
    //   setForm({
    //     email: "",
    //     password: "",
    //   });
    // }
  };
  // if (isPending) {
  //   setForm({
  //     email: "",
  //     password: "",
  //   });
  // }
  // if (signup) {
  //   navigate("/registration");
  //   return <SignUpForm />;
  // }
  // console.log("mutatiom",motation.isError,onError?.message ,motation.isSuccess)
  console.log("on login data",data)
  return (
    <div className="w-full flex justify-center mt-12">
      <div className="w-full max-w-md ">
        {/* Card */}
        {/* <div>{fetchingdata()}</div> */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Welcome
            </h1>
            <p className="text-gray-500">Sign in to your account</p>
          </div>
          <div className="h-8  flex items-end justify-center">
            {error && (
              <p className="text-red-500 text-sm font-semibold">
                login failed !, Try again {error.message}
              </p>
            )}
          </div>
          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Username Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Useremaili
              </label>
              <input
                type="text"
                name="email"
                placeholder="Enter your email"
                onChange={getFormValue}
                value={form.email}
                className={`w-full px-4 py-3 rounded-lg border-2   focus:outline-none transition-colors duration-200 text-gray-900 placeholder-gray-400 ${10 > 13 ? "focus:border-red-500 border-red-500 " : "border-gray-200 focus:border-blue-500 "}`}
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
                  className={`w-full px-4 py-3 rounded-lg border-2  focus:border-blue-500 focus:outline-none transition-colors duration-200 text-gray-900 placeholder-gray-400 pr-12 ${10 > 11 ? "focus:border-red-500 border-red-500 " : "border-gray-200 focus:border-blue-500 "}`}
                />
                <button
                  type="button"
                  onClick={() => setIssee(!issee)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xl hover:scale-110 transition-transform"
                >
                  {issee ? "👁️" : "👁️‍🗨️"}
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
          <div>
            <GoogleLogin
              onSuccess={(response) => {
                console.log(response);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            ></GoogleLogin>
          </div>
          {/* <div className="bg-green-400">
            <button
              className="bg-blue-600 rounded-lg py-2 px-4"
              onClick={() => loginGoogle()}
            >
              Continue with google
            </button>
            <div>
              <button
                className="hover:rounded-lg hover:bg-gray-100 px-2 py-2 "
                onClick={() => setSignUp(true)}
              >
                <p>Create new account</p>
              </button>
            </div>
          </div> */}
          <div className=" flex justify-center text-blue-700">
            <NavLink to="/registration">Create new account</NavLink>
          </div>

          {/* Credentials Info */}
          {/* <div className="mt-8 pt-8 border-t border-gray-200 space-y-3">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-widest">
              Demo Credentials
            </p>
            <div className="space-y-2 text-sm text-gray-700 bg-blue-50 p-4 rounded-lg">
              <div>
                <span className="font-semibold">Username:</span> baba123
              </div>
              <div>
                <span className="font-semibold">Password:</span> 123456
              </div>
            </div>
          </div> */}
        </div>
      </div>
      {/* {error &&
              <div className="w-full fixed top-40 rounded-lg   h-60 max-w-md ">
                <div className="grid justify-center items-center bg-gray-300 h-full rounded-lg">

              <p className="text-red-500">
                login failed ! 
                </p>
                
             
              <XIcon/>
              </div>
            </div>
          } */}
    </div>
  );
};
export default LoginForm;
