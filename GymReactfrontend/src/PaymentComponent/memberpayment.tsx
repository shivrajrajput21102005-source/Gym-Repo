// import React from "react";
import { api } from "../Api";
import { useState } from "react";
import Plan from "../Plans";
import type {} from "globals";
import type { SelectedProp } from "./payment";
type selectMemberProp = {
  selectMember: SelectedProp;
};
import UseFetch from "../UseFetch";
// import { Heading1 } from "lucide-react";
// import { dividerClasses } from "@mui/material/Divider";
// import HandlePayment from "./HandlePayment";
// type SelectedMemberProp = {
//     _id:string,
//   phoneNumber: string;
//     name:string
// }
type dataprop = {
  id: string;
  amount: number;
  currency: string;
};
const memberpayment = ({ selectMember }: selectMemberProp) => {
  const [choosePlan, setChoosePlan] = useState<string | null>(null);
  const [paymentData, setPaymentData] = useState<dataprop | null>(null);
  const [posting, setPosting] = useState(false);
  const { loading, data, error } = UseFetch(
    `/user/payment/selectedmember?memberId=${selectMember.id}`,
  );
  //   console.log(
  //     "memberpayment",
  //     typeof selectMember,
  //     selectMember,
  //     selectMember.name,
  //   );
  const getMemberShip = async (memberId: number, planId: string) => {
    setPosting(true);
    try {
      const res = await api.post(
        `/user/addMembership?memberId=${memberId}&planId=${planId}`,
      );
      setPaymentData(res.data.order);
      setPosting(false);
    } catch (err: any) {
      setPosting(false);
      console.log("not get membership", err?.message);
    }
    const option = {
      key: "rzp_test_SY9KTUPucXwHLj",
      amount: data?.amount,
      // amount: 500 * 100,
      currency: "INR",
      order_id: data?.id,
      name: "My App",
      description: "Test Payment",
      handler: async function (response: any) {
        // alert("Payment succesfull");
        const verifyres = await api.post("/user/verify-order", response);
        alert("Payment successfull");

        if (verifyres.data.status === "SUCCESS") {
          alert("Payment successfull");
        } else {
          alert("Payment failed xx");
        }
        console.log(response);
      },
    };
    console.log("window", window.Razorpay);
    const rzp = new window.Razorpay(option);
    rzp.open();
  };
  console.log(paymentData, loading, error);
  return (
    <div>
      <div>
        <h1>{selectMember.name} </h1>
        <div>
          {data?.ishaveplan ? (
            <h1>{data?.ishaveplan.price}</h1>
          ) : (
            <div>
              <h1>{choosePlan}</h1>
              <Plan choosePlanFunction={setChoosePlan} />
            </div>
          )}
        </div>
        <div className="fixed top-24">
          {choosePlan && (
            // <HandlePayment/>
            <button
              onClick={() => getMemberShip(selectMember.id, choosePlan)}
              className="bg-green-500 py-2 px-4"
            >
              {posting ? "load" : "Get Membership"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default memberpayment;
