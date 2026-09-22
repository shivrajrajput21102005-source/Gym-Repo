import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { api } from "../Api";
import { Navigate, useNavigate} from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ChangePassword } from "../Function/ChangePassword";
import SomeThingWrongPage from "../someThingWrongPage";
const VerifyCodeForSignUp = () => {
  const navigate = useNavigate();
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [values, setValues] = useState<string[]>(Array(6).fill(""));
  const verifyId = sessionStorage.getItem("verificationId");
  const mutate = useMutation({
    mutationKey: ["verify-code"],
    mutationFn: () => verify(values.join(""), verifyId!),
    onSuccess:()=>{
    
navigate("/createpassword")
    }
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const val = e.target.value.slice(-1); // only last char
    const newValues = [...values];
    console.log("val", val, e.target.value, newValues);
    newValues[index] = val;
    setValues(newValues);

    if (val && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const verifyBtn = () => {
    console.log("impitRef");
    if (inputsRef.current[5]?.value === "") {
      return console.log("values is false");
    }
    mutate.mutate();
  };
  if (mutate.data) {
    console.log(
      "mutate data on verify",
      mutate?.data,
      mutate.isError,
      mutate.error,
    );
  }

  useEffect(() => {
    if (!verifyId) {
      navigate("/registration");
    }
  }, []);
  if (mutate?.data?.password) {
    return (
      <div className="  w-full flex flex-col pt-12 items-center rounded-lg">
        <PasswordShow password={mutate.data.password} />;
      </div>
    );
  }

  return (
    <div className="flex gap-2 justify-center mt-20 w-full">
      <div className="bg-blue-400  p-6 w-full max-w-md flex flex-col items-center rounded-lg">
        <div className="space-x-2 text-center bg-blue-300 p-4 rounded-lg flex justify-center  items-center">
          {Array.from({ length: 6 }).map((_, ind) => (
            <input
              key={ind}
              ref={(el) => {
                inputsRef.current[ind] = el;
              }}
              value={values[ind]}
              onChange={(e) => handleChange(e, ind)}
              onKeyDown={(e) => handleKeyDown(e, ind)}
              maxLength={1}
              placeholder="x"
              className="bg-white border-2 border-blue-500 rounded-lg w-10 h-12 outline-none focus:border-blue-800 text-center text-lg"
            />
          ))}
        </div>

        <span className="h-10">
          {mutate.isError && (
            <p className="text-red-500">verifiacation failed </p>
          )}
        </span>

        <button
          className="bg-blue-500 text-white font-semibold p-2 mt-4 rounded-lg w-[40%] hover:bg-blue-600 transition"
          onClick={verifyBtn}
        >
          {mutate.isPending ? "Verifying" : "Verify"}
        </button>
      </div>
    </div>
  );
};

export default VerifyCodeForSignUp;

const verify = async (verificationCode: string, verificationId: string) => {
  const response = await api.post("/createaccount/verify-code", {
    verificationId,
    verificationCode,
  });

  return response.data;
};

const PasswordShow = ({ password }: { password: string }) => {
  const [isSee, setIsSee] = useState(false);
  const [passValue, setPassValue] = useState(password);
  const mutation = useMutation({
    mutationKey: ["changePassword"],
    mutationFn: ChangePassword,
  });
  const setPasswordFn = () => {
    console.log("set pass click");
    mutation.mutate(passValue);
  };
  if (mutation.isError) {
    return <SomeThingWrongPage func={setPasswordFn} />;
  }
  if (mutation.data?.success == true) {
    <Navigate to="/" replace={true} />;
  }
  return (
    <div className=" gap-4 p-6 w-full max-w-md flex flex-col justify-end items-center rounded-lg shadow-2xl">
      <h1 className="text-blue-500 font-bold">DUOPO FITNESS CLUB</h1>
      <div className="gap-2 flex justify-start w-full font-semibold">
        <p className="font-semibold scale-110">Password :</p>
        <p>{password}</p>
      </div>
      <form onSubmit={setPasswordFn} className="flex flex-col p-2 ">
        <label className="text-sm">change password</label>
        <div className="relative ">
          <input
            name="password"
            value={passValue}
            onChange={(e) => setPassValue(e.target.value)}
            type={isSee ? "text" : "password"}
            placeholder="Enter password"
            className={`w-full px-2 py-2 rounded-lg border-2  focus:border-blue-500 focus:outline-none transition-colors duration-200 text-gray-900 placeholder-gray-400 pr-12 `}
          />
          <button
            type="button"
            onClick={() => setIsSee(!isSee)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xl hover:scale-110 transition-transform"
          >
            {isSee ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>
        <button
          type="submit"
          className="rounded-lg bg-blue-600 text-white m-2 px-4 py-2"
        >
          confirm
        </button>
      </form>
    </div>
  );
};
