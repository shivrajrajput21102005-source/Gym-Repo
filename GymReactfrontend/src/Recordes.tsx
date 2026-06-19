// import React from "react";

// const gymData = {
//   deadlift: [
//     { name: "John", weight: "250 kg" },
//     { name: "Mike", weight: "240 kg" },
//     { name: "Sarah", weight: "230 kg" },
//     { name: "David", weight: "225 kg" },
//     { name: "Emma", weight: "220 kg" },
//   ],
//   pushups: [
//     { name: "Alex", reps: 150 },
//     { name: "Chris", reps: 140 },
//     { name: "Sophia", reps: 135 },
//     { name: "Daniel", reps: 130 },
//     { name: "Olivia", reps: 125 },
//   ],
// };

// export default function GymRecords() {
//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold text-center mb-8">🏋️ Gym Records</h1>

//       <div className="grid md:grid-cols-2 gap-8">
//         {/* Deadlift Section */}
//         <div className="bg-white shadow-lg rounded-lg p-6">
//           <h2 className="text-xl font-semibold mb-4 text-gray-800">
//             Top 5 Deadlifts
//           </h2>
//           <ul className="space-y-3">
//             {gymData.deadlift.map((member, index) => (
//               <li
//                 key={index}
//                 className="flex justify-between items-center bg-gray-50 p-3 rounded-md shadow-sm"
//               >
//                 <span className="font-medium text-gray-700">
//                   {index + 1}. {member.name}
//                 </span>
//                 <span className="text-indigo-600 font-bold">
//                   {member.weight}
//                 </span>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Pushups Section */}
//         <div className="bg-white shadow-lg rounded-lg p-6">
//           <h2 className="text-xl font-semibold mb-4 text-gray-800">
//             Top 5 Pushups
//           </h2>
//           <ul className="space-y-3">
//             {gymData.pushups.map((member, index) => (
//               <li
//                 key={index}
//                 className="flex justify-between items-center bg-gray-50 p-3 rounded-md shadow-sm"
//               >
//                 <span className="font-medium text-gray-700">
//                   {index + 1}. {member.name}
//                 </span>
//                 <span className="text-green-600 font-bold">
//                   {member.reps} reps
//                 </span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }
////
import { useQuery } from "@tanstack/react-query";
import axiosFetch from "./AxiosFetch";
// import { useState } from "react";
type Deadlift = {
  name: string;
  weight: string;
  date: string;
};
type pushups = {
  name: string;
  reps: string;
  date: string;
};
type RecordsProp = {
  deadlift: Deadlift[];
  pushups: pushups[];
};
type FetchingRecordsProp = {
  records: RecordsProp;
};
const gymData = {
  deadlift: [
    { name: "John", weight: "250 kg", date: "2026-05-12" },
    { name: "Mike", weight: "240 kg", date: "2026-04-28" },
    { name: "Sarah", weight: "230 kg", date: "2026-03-15" },
    { name: "David", weight: "225 kg", date: "2026-02-20" },
    { name: "Emma", weight: "220 kg", date: "2026-01-10" },
  ],
  pushups: [
    { name: "Alex", reps: 150, date: "2026-05-18" },
    { name: "Chris", reps: 140, date: "2026-04-30" },
    { name: "Sophia", reps: 135, date: "2026-03-22" },
    { name: "Daniel", reps: 130, date: "2026-02-25" },
    { name: "Olivia", reps: 125, date: "2026-01-12" },
  ],
};

export default function GymRecords() {
  // const { data, isLoading, error } = useQuery<FetchingRecordsProp>({
  //   queryKey: ["records"],
  //   queryFn: () => axiosFetch("/records"),
  // });

  // if (error) {
  //   return <div>something won</div>;
  // }
  // //  bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100
  return (
    //  bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100
    <div className=" bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100  p-4 md:p-6 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800">
        🏋️ Gym Records Board
      </h1>
      <RecordesListBackend/>
      {false && (
        <div className="grid md:grid-cols-2 gap-10">
          {/* <RecordesListBackend /> */}
          <RecordList />
          {/* Pushups Section */}
          <div className="bg-white shadow-xl rounded-xl p-4 md:p-6 hover:scale-[1.02] transition-transform">
            <h2 className="text-2xl font-semibold mb-6 text-green-700 flex items-center">
              🤸 Top 5 Pushups
            </h2>
            <ul className="space-y-4">
              {gymData.pushups.map((member, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-green-50 p-4 md:p-4 rounded-lg shadow-sm hover:bg-green-100 transition"
                >
                  <div>
                    <span className="font-bold text-gray-800">
                      {index + 1}. {member.name}
                    </span>
                    <p className="text-sm text-gray-500">
                      Record set on {new Date(member.date).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="text-green-600 font-extrabold text-lg">
                    {member.reps} reps
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

const RecordList = () => {
  return (
    <div className="bg-white shadow-xl rounded-xl p-4 md:p-6 hover:scale-[1.02] transition-transform">
      <h2 className="text-2xl font-semibold mb-6 text-indigo-700 flex items-center">
        💪 Top 5 Deadlifts REcordssssssssssssssssss
      </h2>
      <ul className="space-y-4">
        {gymData.deadlift.map((member, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-indigo-50 p-2 md:p-4 rounded-lg shadow-sm hover:bg-indigo-100 transition"
          >
            <div>
              <span className="font-bold text-gray-800">
                {index + 1}. {member.name}
              </span>
              <p className="text-sm text-gray-500">
                Record set on {new Date(member.date).toLocaleDateString()}
              </p>
            </div>
            <span className="text-indigo-600 font-extrabold text-lg">
              {member.weight}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const RecordesListBackend = () => {
  const { data, isLoading ,error} = useQuery<FetchingRecordsProp>({
    queryKey: ["records"],
    queryFn: () => axiosFetch("/records"),
  });
  console.log("records", data?.records.deadlift);
  if (isLoading) {
    // return <div> Record backend loading</div>
    return (
      <div>
        {/* <Skeleton width={220} height={220}/> */}
        <Sket />
      </div>
    );
  }
  if(error){
    return <div>something roee</div>
  };
  
  return (
    <div className="bg-white shadow-xl rounded-xl p-6 hover:scale-[1.02] transition-transform">
      <h2 className="text-2xl font-semibold mb-6 text-indigo-700 flex items-center">
        💪 Top 5 Deadlifts records from backend
      </h2>
      <ul className="space-y-4">
        {data?.records.deadlift.map((member, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-indigo-50 p-4 rounded-lg shadow-sm hover:bg-indigo-100 transition"
          >
            <div>
              <span className="font-bold text-gray-800">
                {index + 1}. {member.name}
              </span>
              <p className="text-sm text-gray-500">
                Record set on {new Date(member.date).toLocaleDateString()}
              </p>
              <p className="text-gray-500">{member.date}opo</p>
            </div>
            <span className="text-indigo-600 font-extrabold text-lg">
              {member.weight}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Sket = () => {
  const Skett = () => {
    return (
      <div className="space-y-2 rounded shadow-sm pl-2 pr-2 rounded-lg flex flex-col border-4  border-gray-200 ">
        <Skeleton height={20} containerClassName="w-[60%]" />

        <Skeleton
          height={50}
          count={5}
          baseColor="#e3e8ec"
          containerClassName="flex flex-col  rounded-lg w-[96%]   "
        />
      </div>
    );
  };
  return (
    <div className=" md:p-4 bg-red-40">
      <div className="grid grid-cols-2 gap-6  ">
        <Skett />
        <Skett />
        <Skett />
        <Skett />
      </div>
    </div>
  );
};
