// import { useMutation } from "@tanstack/react-query";
// import React, { useRef } from "react";
// import { api } from "./Api";
// const verify = async(verificationCode:string)=>{
//   try{
//     await api.post("/forgetpassword/verify-code",{verificationCode})
//   }
//   catch(err){

//   }

// }
// const Verifycode = () => {
//   const currentRef = useRef<HTMLInputElement | null>(null);
//   const mutate = useMutation({
//     mutationKey:["verify-code"],
//     mutationFn:verify
//   })
// const onchange=(e:React.ChangeEvent<HTMLInputElement>)=>{
//   // currentRef.current(e)
// console.log("e",e,currentRef.current)
// }
// const verifyBtn=()=>{
//   mutate()
// }
//   return (
//     <div className="flex gap-2 justify-center w-full ">
//       <div className="bg-red-400 gap-4 p-2 m-6 w-full max-w-md flex flex-col items-center">
//         <div className="space-x-4 text-center bg-blue-300  flex   justify-center items-center ">

//         {Array.from({ length: 6 }).map((_, ind) => (
//           <input
//           ref={(e)=>currentRef.current==e}
//           key={ind}
//           onChange={(e)=>onchange(e)}
//           placeholder="x"
//           className="bg-blue-300 border-2 border-blue-500 rounded-lg w-[7%] h-[101%] outline-none focus:border-blue-800 text-center"
//           />
//         ))}
//         </div>
//         <button className="bg-blue-300 p-2 text-center w-[40%]" onClick={verifyBtn}>Verify</button>
//       </div>
//     </div>
//   );
// };

// export default Verifycode;
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { api } from "./Api";
import { useNavigate, useParams } from "react-router-dom";

const verify = async (verificationCode: string, verificationId: string) => {
  try {
    const { data } = await api.post("/forgetpassword/verify-code", {
      verificationId,
      verificationCode,
    });
    return data;
  } catch (err) {
    console.error(err);
  }
};

const Verifycode = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [btnDisable, setBtnDisable] = useState(true);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [values, setValues] = useState<string[]>(Array(6).fill(""));

  const mutate = useMutation({
    mutationKey: ["verify-code"],
    mutationFn: () => verify(values.join(""), code!),
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
  useEffect(() => {
    if (!code) {
      navigate("/forgetpassword");
    }
  }, []);
  return (
    <div className="flex gap-2 justify-center mt-20 w-full">
      <div className="bg-blue-400 gap-4 p-6 w-full max-w-md flex flex-col items-center rounded-lg">
        <div className="space-x-2 text-center bg-blue-300 p-4 rounded-lg flex justify-center items-center">
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
        <h1 className="text-red-500 h-4">{mutate?.data?.message}</h1>
        <button
          className="bg-blue-500 text-white font-semibold p-2 mt-4 rounded-lg w-[40%] hover:bg-blue-600 transition"
          onClick={verifyBtn}
        >
          Verify
        </button>
    
      </div>
    </div>
  );
};

export default Verifycode;
