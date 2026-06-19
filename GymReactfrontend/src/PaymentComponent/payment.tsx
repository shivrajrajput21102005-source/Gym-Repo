// import { useEffect, useState } from "react";
// // import React from "react";
// import UseFetch from "../UseFetch";
// // import { Divide } from "lucide-react";
// // import HorizontalStepper from "./HorizontalStepper";

// import Memberpayment from "./memberpayment";

// export type MemberProp = {
//   name: string;
//   phoneNumber: string;
//   _id: string;
// };

// type MembersResponse = {
//   member: MemberProp[];
// };

// function useDelayedValue(value: string, delay: number) {
//   const [delayedValue, setDelayedValue] = useState("");

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDelayedValue(value);
//     }, delay);

//     return () => clearTimeout(timer);
//   }, [value, delay]);

//   return delayedValue;
// }

// const PaymentForm = () => {
//   const [inputValue, setInputValue] = useState("");
//   const delayedInputValue = useDelayedValue(inputValue, 400);
//   const [recentSearch, setRecentSearch] = useState(["rahul", "shekhar"]);
//   const [selectedMember, setSelectedMember] = useState<MemberProp | null>(null);
//   const { loading, data } = UseFetch<MembersResponse>(
//     `/user/filtermember?q=${delayedInputValue}`,
//   );
//   const handleRecent = (item: string) => {
//     setRecentSearch((prev) => {
//       const update = [item, ...prev.filter((p) => p !== item)];
//       return update.slice(0, 5);
//     });
//   };

//   console.log("real", delayedInputValue);

//   return (
//     <>
//       {!selectedMember && (
//         <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4 py-8">
//           {/* Header */}
//           <header className="w-full max-w-2xl mb-6 text-center">
//             <h1 className="text-2xl font-bold text-gray-800">
//               Member Directory
//             </h1>
//             <p className="text-gray-500 mt-1">
//               Search and manage your members easily
//             </p>
//           </header>

//           {/* Search Section */}
//           <div className="w-full max-w-2xl bg-white rounded-xl shadow-md p-6">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search member..."
//                 value={inputValue}
//                 onChange={(event) => setInputValue(event.target.value)}
//                 className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
//               />
//               {inputValue && (
//                 <button
//                   onClick={() => setInputValue("")}
//                   className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
//                 >
//                   ✕
//                 </button>
//               )}
//             </div>

//             {/* Recent Searches */}
//             <div className="mt-6">
//               {!inputValue && recentSearch.length > 0 && (
//                 <>
//                   <h2 className="text-lg font-semibold text-gray-700 mb-3">
//                     Recent Searches
//                   </h2>
//                   <ul className="divide-y divide-gray-200 rounded-lg border border-gray-200 bg-gray-50">
//                     {recentSearch.map((item, ind) => (
//                       <li
//                         key={ind}
//                         onClick={() => {
//                           setInputValue(item);
//                           handleRecent(item);
//                         }}
//                         className="cursor-pointer px-4 py-2 hover:bg-blue-50 transition"
//                       >
//                         {item}
//                       </li>
//                     ))}
//                   </ul>
//                 </>
//               )}
//             </div>
//             <div>
//               {inputValue &&

//                 (!loading ? (
//                   <div>
//                     {data?.member.map((mem) => (
//                       <div onClick={() => setSelectedMember(mem)}>
//                         {mem.name}
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
//                 ))}
//             </div>
//           </div>

//           {/* Footer */}
//           <footer className="mt-10 text-sm text-gray-400">
//             © 2026 Member Directory. All rights reserved.
//           </footer>
//         </div>
//       )}
//       ////////// ///maa mead//
//       {/* {!selectedmember && (
//         <div>
//           <div className="w-full px-4 py-4">
//             <input type="text" />
//             <input
//               type="text"
//               placeholder="search member"
//               value={inputValue}
//               onChange={(event) => setInputValue(event.target.value)}
//               className="rounded-lg w-full px-4 py-2 border-2 bprder-gray focus:outline-none focus:border-blue-700 "
//             />
//             <div className="py-2">
//               {!inputValue && (
//                 <div>
//                   <h1 className="font-sm text-xl">Recent search</h1>

//                   <div className="px-4">
//                     {recentsearch.map((item, ind) => (
//                       <h1
//                         className="cursor-pointer border-b-2"
//                         key={ind}
//                         onClick={() => {
//                           setInputValue(item);
//                           handlerecent(item);
//                         }}
//                       >
//                         {item}
//                       </h1>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {inputValue && loading && <div>loading.....</div>}
//               {!loading && inputValue && (
//                 <div>
//                   {data?.member.map((m) => (
//                     <h1
//                       className=""
//                       onClick={() => setSelectedMember(m)}
//                       key={m._id}
//                     >
//                       {m.name}
//                     </h1>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )} */}
//       {selectedMember && (
//         <div>
//           <Memberpayment selectMember={selectedMember} />
//         </div>
//       )}
//     </>
//   );
// };

// export default PaymentForm;

////////
// pages/MemberPage.js
// pages/MemberPage.js
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
const members = [
  {
    id: 1,
    name: "John Doe",
    role: "Beginner",
    avatar: "https://i.pravatar.cc/100?img=1",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Intermediate",
    avatar: "https://i.pravatar.cc/100?img=2",
  },
  {
    id: 3,
    name: "Mike Johnson",
    role: "Advanced",
    avatar: "https://i.pravatar.cc/100?img=3",
  },
];
export type SelectedProp = {
  id:number,
  name:string,
  role:string,
  avatar:string
}
export function MemberPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<SelectedProp| null>(null);
  const navigate = useNavigate();

  const filteredMembers = members.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleNext = () => {
    if (selected) {
      navigate("/plans", { state: { member: selected.name } });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress */}
      <div className="flex justify-center py-4 text-sm text-gray-500">
        <span className="font-semibold text-indigo-600">Step 1</span> / 3 —
        Select Member
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-12 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold">
          Choose Your Fitness Partner
        </h1>
        <p className="mt-2 text-lg opacity-90">
          Select a member to personalize their journey
        </p>
      </div>

      {/* Search */}
      <div className="flex justify-center mt-8">
        <input
          type="text"
          placeholder="Search member..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-80 border rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      {/* Members Grid */}
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-10 px-6">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            onClick={() => setSelected(member)}
            className={`cursor-pointer bg-white rounded-xl shadow-md p-6 flex flex-col items-center transition transform hover:scale-105 ${
              selected?.id === member.id ? "ring-2 ring-indigo-500" : ""
            }`}
          >
            <img
              src={member.avatar}
              alt={member.name}
              className="w-20 h-20 rounded-full mb-4"
            />
            <h2 className="text-lg font-bold">{member.name}</h2>
            <p className="text-sm text-gray-500">{member.role}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="flex justify-center mt-12">
        <button
          onClick={handleNext}
          disabled={!selected}
          className={`px-8 py-3 rounded-lg font-semibold transition ${
            selected
              ? "bg-indigo-600 text-white hover:bg-indigo-700"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
        >
          Continue to Plans
        </button>
      </div>
    </div>
  );
}

// pages/PlanPage.js
import { useLocation } from "react-router-dom";
import axiosFetch from "../AxiosFetch";

export function PlanPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const member = location.state?.member;

  const plans = [
    { id: 1, name: "Basic", price: 500 },
    { id: 2, name: "Premium", price: 1000 },
  ];

  const handleSelectPlan = (plan:any) => {
    navigate("/payment", { state: { member, plan } });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h2 className="text-3xl font-bold text-center mb-8">
        Plans for <span className="text-blue-600">{member}</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-xl transition"
          >
            <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
            <p className="text-gray-600 mb-4">₹{plan.price}</p>
            <button
              onClick={() => handleSelectPlan(plan)}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Select
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
// pages/PaymentPage.js
// pages/PaymentPage.js

export function PaymentPage() {
  const location = useLocation();
  const { member, plan } = location.state || {};

  const handlePayment = () => {
    const options = {
      key: "YOUR_RAZORPAY_KEY_ID",
      amount: plan.price * 100,
      currency: "INR",
      name: "Gym App",
      description: `Payment for ${plan.name} plan`,
      handler: function (response:any) {
        alert("✅ Payment Successful! ID: " + response.razorpay_payment_id);
      },
      prefill: {
        name: member,
        email: "test@example.com",
        contact: "9999999999",
      },
      theme: { color: "#6366f1" },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Progress */}
      <div className="py-4 text-sm text-gray-500">
        <span className="font-semibold text-indigo-600">Step 3</span> / 3 —
        Payment
      </div>

      {/* Summary Card */}
      <div className="bg-white shadow-lg rounded-lg p-8 w-96 text-center mt-6">
        <h2 className="text-2xl font-bold mb-4">Payment Summary</h2>
        <p className="text-gray-700 mb-2">👤 Member: {member}</p>
        <p className="text-gray-700 mb-2">📋 Plan: {plan?.name}</p>
        <p className="text-lg font-semibold mb-6">💰 Amount: ₹{plan?.price}</p>

        {/* Payment Method */}
        <button
          onClick={handlePayment}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
        >
          Pay Securely with Razorpay
        </button>
      </div>
    </div>
  );
}
import type { AllPlans } from "../Plans";
export const SelectedPlans = () => {
  const { id } = useParams();
  const [plan, setPlan] = useState<AllPlans | null>(null);
  const plansQuery = useQuery({
    queryKey: ["selectedPlan"],
    queryFn: () => axiosFetch(`/selectedplan/${id}`),
  });
  useEffect(() => {
    if (plansQuery.data) {
      setPlan(plansQuery.data.plan);
    }
  }, [plansQuery.data]);

  console.log("selected palns id = ", id);
  if (plansQuery.isLoading) {
    return <div>Loading plans</div>;
  }
  if (plansQuery.isError) {
    return <div>{plansQuery.error.message}op</div>;
  }
  return (
    <div>
      <p>selected page plans</p>
      <p className="bg-red-800 w=6 h-8">{plan?.name}</p>
      <span className="absolute top-4 right-4 bg-indigo-600 text-xs text-white px-3 py-1 rounded-full">
        {plan?.badge}
      </span>

      <h2 className="text-xl font-bold">{plan?.name}</h2>

      <p className="md:mt-2 text-green-600 font-medium">{plan?.offer}</p>
      <div className="md:block flex justify-between">
        <ul className="md:mt-6 space-y-2 text-gray-700">
          {plan?.features.map((feature, i) => (
            <li key={i} className="flex items-center">
              <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2"></span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
