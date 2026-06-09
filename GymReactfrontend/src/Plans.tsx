// import React, { useState } from "react";
// import UseFetch from "./UseFetch";
// type choosePlanProp = {
//   choosePlanFunction: React.Dispatch<React.SetStateAction<string | null>>;
// };

// const plans = [
//   {
//     name: "Starter",
//     monthly: 499,
//     yearly: 4499,
//     offer: "Perfect for beginners",
//     badge: "Entry",
//     features: ["Cardio zone", "Locker facility"],
//   },
//   {
//     name: "Basic",
//     monthly: 999,
//     yearly: 8999,
//     offer: "No Joining Fee",
//     badge: "Popular",
//     features: ["Gym equipment", "Locker facility"],
//   },
//   {
//     name: "Standard",
//     monthly: 1499,
//     yearly: 13499,
//     offer: "Free diet chart",
//     badge: "Value",
//     features: ["Weight training", "Group classes"],
//   },
//   {
//     name: "Pro",
//     monthly: 2499,
//     yearly: 21999,
//     offer: "1 Free PT Session",
//     badge: "Best Value",
//     features: ["Diet consultation", "Extended hours", "Group classes"],
//   },
//   {
//     name: "Premium",
//     monthly: 4999,
//     yearly: 44999,
//     offer: "Free Merchandise",
//     badge: "Exclusive",
//     features: ["Unlimited PT", "Nutrition plan", "Priority support"],
//   },
//   {
//     name: "Elite",
//     monthly: 6999,
//     yearly: 62999,
//     offer: "VIP Lounge Access",
//     badge: "Luxury",
//     features: ["Dedicated trainer", "Spa access", "Nutritionist support"],
//   },
//   {
//     name: "Student",
//     monthly: 799,
//     yearly: 6999,
//     offer: "Discounted for students",
//     badge: "Youth",
//     features: ["Flexible timings", "Study-friendly schedule"],
//   },
//   {
//     name: "Couple",
//     monthly: 3499,
//     yearly: 30999,
//     offer: "For 2 members",
//     badge: "Duo",
//     features: ["Shared trainer", "Couple yoga sessions"],
//   },
//   {
//     name: "Family",
//     monthly: 7999,
//     yearly: 72999,
//     offer: "Up to 4 members",
//     badge: "Group",
//     features: ["Family classes", "Nutrition workshops"],
//   },
// ];
// type AllPlans={
//   _id:string,
//   name:string,
//   offer:string,
//   badge:string,
//   price:number,
//   features:[]
// }
// type FetchingProps = {
//   allPlans:AllPlans[]
// }

// export default function GymPlans({ choosePlanFunction }: choosePlanProp) {
//   const [billingCycle, setBillingCycle] = useState("monthly");
//   const { loading, data, error } = UseFetch<FetchingProps>(`/allPlans?q=${billingCycle}`);
//   if (loading) {
//     return <div>loading</div>;
//   }
//   if (error) {
//     return <div>{error.message}</div>;
//   }
// console.log("plandata " ,data, "type" , typeof choosePlanFunction)
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-500 via-black to-gray-700 text-white">
//       {/* Hero */}
//       <div className="relative h-64 flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1599058917212-9f1f3f3f3f3f')] bg-cover bg-center">
//         <div className="absolute inset-0 bg-gray-00"></div>
//         <h1 className="relative text-5xl font-extrabold tracking-tight">
//           Transform Your Fitness Journey
//         </h1>
//       </div>

//       {/* Toggle */}
//       <div className="flex justify-center mt-10">
//         <div className="flex bg-gray-700 rounded-full p-1">
//           <button
//             onClick={() => setBillingCycle("monthly")}
//             className={`px-6 py-2 rounded-full font-semibold text-black transition ${
//               billingCycle === "monthly"
//                 ? "bg-indigo-600 text-white shadow-lg"
//                 : "text-gray-300"
//             }`}
//           >
//             Monthly
//           </button>
//           <button
//             onClick={() => setBillingCycle("yearly")}
//             className={`px-6 py-2 rounded-full font-semibold transition ${
//               billingCycle === "yearly"
//                 ? "bg-indigo-600 text-white shadow-lg"
//                 : "text-gray-300"
//             }`}
//           >
//             Yearly
//           </button>
//         </div>
//       </div>
//       <div className="px-12 font-bold text-3xl">Plans</div>
//       {/* Plans Grid */}
//       <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto mt-12 px-6">
//         {data?.allPlans.map((plan) => (
//           <div
//             key={plan._id}
//             className="relative rounded-3xl p-8 bg-white/10 backdrop-blur-lg border border-gray-700 shadow-xl hover:scale-105 hover:border-indigo-500 transition transform"
//           >
//             {/* Badge */}
//             <span className="absolute top-4 right-4 bg-indigo-600 text-xs px-3 py-1 rounded-full">
//               {plan.badge}
//             </span>

//             <h2 className="text-2xl font-bold">{plan.name}</h2>
//             <p className="text-5xl font-extrabold text-indigo-400 mt-4">
//               ₹{billingCycle === "monthly" ? plan.price : plan.price}
//             </p>
//             <p className="mt-2 text-green-400 font-medium">{plan.offer}</p>
//             <ul className="mt-6 space-y-3 text-gray-200">
//               {plan.features.map((feature, i) => (
//                 <li key={i} className="flex items-center">
//                   <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2"></span>
//                   {feature}
//                 </li>
//               ))}
//             </ul>
//             <button onClick={()=>choosePlanFunction(plan._id)} className="mt-8 w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90">
//               Get Started
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
///////////////////

import React, { useState } from "react";
import UseFetch from "./UseFetch";
import { useNavigate } from "react-router-dom";

type ChoosePlanProp = {
  choosePlanFunction?: React.Dispatch<React.SetStateAction<string | null>>;
};

export type AllPlans = {
  _id: string;
  name: string;
  offer: string;
  badge: string;
  price: number;
  monthly: number;
  yearly: number;
  features: string[];
};

type FetchingProps = {
  allPlans: AllPlans[];
};

export default function GymPlans({ choosePlanFunction }: ChoosePlanProp) {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly",
  );
  const [selectedPlan, setSelectedPlan] = useState<AllPlans | null>(null);

  const { loading, data, error } = UseFetch<FetchingProps>(
    `/allPlans?q=${billingCycle}`,
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        Loading plans...
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        {error.message}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero */}
      <div className="relative md:p-10 p-4 flex items-center justify-center bg-indigo-100">
        <h1 className="relative md:text-2xl font-extrabold tracking-tight text-indigo-700">
          Transform Your Fitness Journey
        </h1>
      </div>

      {/* Toggle */}
      <div className="flex justify-center mt-2 md:mt-8">
        <div className="flex bg-gray-200 rounded-full p-1">
          {["monthly", "yearly"].map((cycle) => (
            <button
              key={cycle}
              onClick={() => setBillingCycle(cycle as "monthly" | "yearly")}
              className={`md:px-6 px-4 py-2 rounded-full font-semibold transition ${
                billingCycle === cycle
                  ? "bg-indigo-600 text-white shadow"
                  : "text-gray-600 hover:bg-gray-300"
              }`}
            >
              {cycle.charAt(0).toUpperCase() + cycle.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Plans Grid */}
      <div className="md:px-12 pl-6 font-bold text-2xl md:mt-10">Plans</div>
      <div className="grid md:grid-cols-3 md:gap-8 gap-4 max-w-7xl mx-auto mt-8 px-6">
        {data?.allPlans.map((plan) => (
          <PlanCard
            key={plan._id}
            plan={plan}
            price={plan.price}
            billingCycle={billingCycle}
            selected={selectedPlan === plan}
            onSelect={() => {
              setSelectedPlan(plan);
              if (choosePlanFunction) {
                choosePlanFunction(plan._id);
              }
              if (selectedPlan) {
                navigate(`/selectedplans/${selectedPlan._id}`);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}

type PlanCardProps = {
  plan: AllPlans;
  price: number;
  billingCycle: "monthly" | "yearly";
  selected: boolean;
  onSelect: () => void;
};

function PlanCard({
  plan,
  billingCycle,
  price,
  selected,
  onSelect,
}: PlanCardProps) {
  return (
    <div
      className={`relative rounded-2xl p-4 md:p-6 border shadow-sm transition transform
        ${selected ? "border-indigo-500 bg-indigo-50 scale-105" : "border-gray-200 bg-white"}
      `}
    >
      {/* Badge */}
      <span className="absolute top-4 right-4 bg-indigo-600 text-xs text-white px-3 py-1 rounded-full">
        {plan.badge}
      </span>

      <h2 className="text-xl font-bold">{plan.name}</h2>
      <p className="text-4xl font-extrabold text-indigo-600 md:mt-4">
        ₹{billingCycle === "monthly" ? price : price}
      </p>
      <p className="md:mt-2 text-green-600 font-medium">{plan.offer}</p>
      <div className="md:block flex justify-between">
        <ul className="md:mt-6 space-y-2 text-gray-700">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-center">
              <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2"></span>
              {feature}
            </li>
          ))}
        </ul>

        <button
          onClick={onSelect}
          className="md:mt-6 md:w-full md:py-2 px-2 h-10 text-nowrap rounded-lg font-semibold bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400"
        >
          {selected ? "Selected" : "Get Started"}
        </button>
      </div>
    </div>
  );
}

////////////////////
