import { useMutation } from "@tanstack/react-query";
import { api } from "./Api";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
const ForgotePassword = () => {
  const [email, setEmail] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
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
      setIsEmpty(true);
      return;
    }
    setIsEmpty(false);

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
      <div className=" relative p-4 space-y-4 shadow-2xl  rounded-lg max-w-md">
        <h1 className="w-full flex items-center justify-center">
          forgot password?
        </h1>
        <div>
          <label className="font-semibold mt-4 ">Email Address</label>
          <input
            className={`w-full  border-blue-400 border-2 outline-none rounded-lg  p-2 ${isEmpty && "border-red-400"}`}
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="text-sm text-red-600 h-4 ">
            {mutate.isError && "Email is not found !"}
          </p>
        </div>

        <button
          onClick={sendCodeBtn}
          className="w-full bg-purple-500 p-2 rounded-lg"
        >
          {mutate.isPending ? "sending..." : "send code"}
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

        {/* <div className="absolute top-1/3 left-1/4 ">lll
          <div className="bg-gray-400 ">

          </div>
       
        </div> */}
      </div>
    </div>
  );
};

export default ForgotePassword;
