import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import { useMutation } from "@tanstack/react-query";
type SignUpReturnProp = {
  success: boolean;
  message?: string | null;
  verifyId?: string;
};
const SignUpForm = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
  });
  // const [error, setError] = useState<string | null>(null);
  const getFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const signUpMutation = useMutation<SignUpReturnProp, Error>({
    mutationKey: ["signUp"],
    mutationFn: () => signup(formData),
    onSuccess: (data) => {
      if (data.verifyId) {
        sessionStorage.setItem("verificationId", data?.verifyId);
      }
      navigate("/verifycode");
    },
  });
  const CreateAccount = async (e: React.ChangeEvent) => {
    e.preventDefault();
    if (formData.email == "") {
      return;
    }
    signUpMutation.mutate();

   };



  return (
    <>
      <div className="w-full mt-12 flex justify-center  bg-red-900">
        <div className="py-2 px-4 bg-white  shadow-2xl  w-screen max-w-md rounded-lg ">
          <h1 className=" w-full text-center text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent ">
            Duopofitnessclub
          </h1>
          <h1 className="text-2xl pt-8 font-sm bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Create New Account
          </h1>

          <form onSubmit={CreateAccount} className="space-y-2 pt-2 ">
            <div className="space-y-2 ">
              <label className="text-left text-sm font-semibold px-2 pt-4 text-gray-700 block">
                Email
              </label>
              <input
                name="email"
                type="email"
                placeholder="Enter your Email"
                value={formData.email}
                onChange={getFormData}
                className="w-full px-4 py-3 rounded-lg border-2   focus:outline-none transition-colors duration-200 text-gray-900 placeholder-gray-400 focus:border-blue-500"
              />
              <div>
                {signUpMutation.isError && (
                  <p className="text-red-500">something wrong</p>
                )}
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={signUpMutation.isPending}
                className="w-full bg-blue-600 mt-4  py-2 px-4 text-white  rounded-lg shadow-lg transition-all duration-200 transform-transition hover:scale-105 active:scale-95 rounded-lg"
              >
                {signUpMutation.isPending ? "pending..." : "Continue"}
              </button>
            </div>
          </form>
          <div className="flex gap-2 m-4">
            <p>have an account ?</p>
            <NavLink to="/login">
              <p className="text-blue-600 hover:underline">login</p>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};
export default SignUpForm;
