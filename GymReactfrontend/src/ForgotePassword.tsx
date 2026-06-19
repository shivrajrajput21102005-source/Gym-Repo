import { useMutation } from "@tanstack/react-query";
import { api } from "./Api";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
const ForgotePassword = () => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const sendCode = async (email: string) => {
    const { data } = await api.post("/forgetpassword/send-code", { email });
    return data;
  };
  const mutate = useMutation({
    mutationKey: ["sendCodetoemail"],
    mutationFn: sendCode,
  });
  const sendCodeBtn = async () => {
    if (!email) {
      return;
    }
    mutate.mutate(email);
    // const responce = await mutate.data.code
  };
  if (mutate.data) {
    const verifyId = mutate.data?.verificationId;
    // <Navigate to="/login" />;
    navigate(`verify-code/${verifyId}`);
  }
  console.log("mutate data", mutate.data);
  return (
    <div className="flex mt-20 justify-center ">
      <div className="w-1/3 p-4 space-y-4 shadow-2xl  rounded-lg">
        <h1 className="w-full flex items-center justify-center">
          forgot password?
        </h1>
        <label className="font-semibold mt-4">Email Address</label>
        <input
          className="w-full  border-blue-400 border-2 outline-none rounded-lg pt-0 pl-2 pr-2 pb-2"
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={sendCodeBtn}
          className="w-full bg-purple-500 rounded-lg"
        >
          send code
        </button>
        <div className="relative w-full pl-4 pr-4">
          <div className="w-full h-1 bg-gray-400 rounded-lg "></div>
        </div>
        <div className="flex justify-center gap-2">
          <p>have an account ? </p>
          <NavLink to="/login" className="text-blue-600 hover:underline">
            login
          </NavLink>
        </div>
        <p>{mutate.data?.code}</p>
      </div>
    </div>
  );
};

export default ForgotePassword;
