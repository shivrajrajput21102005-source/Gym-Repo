// // import React, { useEffect, useState } from "react";
// // import { CircularProgressbar } from "react-circular-progressbar";
// import { useQuery } from "@tanstack/react-query";
// import axiosFetch from "./AxiosFetch";
// import "react-circular-progressbar/dist/styles.css";
// type Member = {
//   name:string
// }
// type ExpireMembersProp={
//  price:number;
//  member:Member

// }
// type ExpireMemberProp = {
//   expireMembers : ExpireMembersProp[]
// }
// const Expiry = () => {
//   // const [pe, setPe] = useState(0);
//   // useEffect(() => {
//   //   const timer = setInterval(() => {
//   //     setPe((prev) => {
//   //       if (prev >= 100) {
//   //         clearInterval(timer);
//   //         return 100;
//   //       }
//   //       return prev + 10;
//   //     });
//   //   }, 500);
//   //   return () => clearInterval(timer);
//   // }, []);
//   // console.log("pep,", pe);
//   // clearTimeout(timer)
//   const { data, isLoading, error } = useQuery<ExpireMemberProp>({
//     queryKey: ["expireMember"],
//     queryFn: () => axiosFetch("/user/expiremembers"),
//   });
//   if (isLoading) {
//     return (
//       <div className="w-full h-screen flex justify-center items-center">
//         <div className="w-12 h-12 rounded-full border-4 border-t-gray-600 border-gray-200 animate-spin"></div>
//       </div>
//     );
//   }
//   console.log("expireserror" , data,error)
//   if (error) {
//     return (
//       <div className="w-full h-screen flex justify-center items-center">
//         <div>someting wrong</div>
//         <div>{error.message}</div>
//       </div>
//     );
//   }
//   return (
//     <div className="w-full h-screen flex items-center justify-center">
     
//         {data?.expireMembers.length == 0  ? <div>no expires members</div>:
       
//       <div>
//         {data?.expireMembers.map((m, i) => (
//           <div key={i}>
//             <li>{m.member}</li>
//             <li>{m.price}</li>
//           </div>
//         ))}
//       </div>}
//       {/* <div className="w-40 h-30 ">
//         <CircularProgressbar
//           value={pe}
//           text={`${pe} %`}
//           styles={{
//             path: {
//               stroke: "#4caf50",
//             },
//             trail: {
//               stroke: "#ede3e3",
//             },
//           }}
//         />
//       </div> */}
//     </div>
//   );
// };

// export default Expiry;


////////////// ui
import { useQuery } from "@tanstack/react-query";
import axiosFetch from "./AxiosFetch";
import { CalendarDaysIcon, CurrencyRupeeIcon, UserIcon } from "@heroicons/react/24/outline";

type Member = {
  name: string;
};

type ExpireMembersProp = {
  price: number;
  member: Member;
  expiresdate: string;
};

type ExpireMemberProp = {
  expireMembers: ExpireMembersProp[];
};

const Expiry = () => {
  const { data, isLoading, error } = useQuery<ExpireMemberProp>({
    queryKey: ["expireMember"],
    queryFn: () => axiosFetch("/user/expiremembers"),
  });

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="w-12 h-12 rounded-full border-4 border-t-gray-600 border-gray-200 animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex justify-center items-center flex-col gap-2">
        <div className="text-red-600 font-semibold">Something went wrong</div>
        <div className="text-gray-700">{(error as Error).message}</div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 p-4">
      {data?.expireMembers.length === 0 ? (
        <div className="text-gray-600 text-lg font-medium">
          No expired members 🎉
        </div>
      ) : (
        <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.expireMembers.map((m, i) => (
            <div
              key={i}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col gap-3 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                <UserIcon className="w-5 h-5 text-blue-500" />
                {m.member.name}
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <CurrencyRupeeIcon className="w-5 h-5 text-green-500" />
                Price: {m.price}
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <CalendarDaysIcon className="w-5 h-5 text-red-500" />
                Expires on:{" "}
                {new Date(m.expiresdate).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Expiry;
/////

// import { useQuery } from "@tanstack/react-query";
// import axiosFetch from "./AxiosFetch";
// import "react-circular-progressbar/dist/styles.css";

// type Member = {
//   name: string;
// };

// type ExpireMembersProp = {
//   price: number;
//   member: Member;
//   expiresdate: string;
// };

// type ExpireMemberProp = {
//   expireMembers: ExpireMembersProp[];
// };

// const Expiry = () => {
//   const { data, isLoading, error } = useQuery<ExpireMemberProp>({
//     queryKey: ["expireMember"],
//     queryFn: () => axiosFetch("/user/expiremembers"),
//   });

//   if (isLoading) {
//     return (
//       <div className="w-full h-screen flex justify-center items-center">
//         <div className="w-12 h-12 rounded-full border-4 border-t-gray-600 border-gray-200 animate-spin"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="w-full h-screen flex justify-center items-center flex-col gap-2">
//         <div className="text-red-600 font-semibold">Something went wrong</div>
//         <div className="text-gray-700">{(error as Error).message}</div>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 p-4">
//       {data?.expireMembers.length === 0 ? (
//         <div className="text-gray-600 text-lg font-medium">
//           No expired members 🎉
//         </div>
//       ) : (
//         <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {data?.expireMembers.map((m, i) => (
//             <div
//               key={i}
//               className="bg-white shadow-md rounded-lg p-4 flex flex-col gap-2 hover:shadow-lg transition-shadow duration-300"
//             >
//               <div className="text-lg font-semibold text-gray-800">
//                 {m.member.name}
//               </div>
//               <div className="text-gray-600">💰 Price: ₹{m.price}</div>
//               <div className="text-gray-500 text-sm">
//                 ⏳ Expires on:{" "}
//                 {new Date(m.expiresdate).toLocaleDateString("en-IN", {
//                   year: "numeric",
//                   month: "short",
//                   day: "numeric",
//                 })}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Expiry;
