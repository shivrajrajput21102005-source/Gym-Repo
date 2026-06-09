import { useMutation } from "@tanstack/react-query";
import { api } from "./Api";
import { useState } from "react";

const ForgotePassword = () => {
  const [email, setEmail] = useState("");
  const sendCode = async (email: string) => {
    await api.post("/forgetpassword", { email });
  };
  const mutate = useMutation({
    mutationKey: ["sendCodetoemail"],
    mutationFn: sendCode,
  });
  const sendCodeBtn = () => {
    if (!email) {
      return;
    }
    mutate.mutate(email);
  };
  return (
    <div className="p-4 gap-6 shadow-sm">
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={sendCodeBtn}>send code</button>
    </div>
  );
};

export default ForgotePassword;
