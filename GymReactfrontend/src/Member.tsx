// import UseFetch from "./UseFetch";
// import { NavLink } from "react-router-dom";

type MemberProp = {
  _id:string;
  name: string;
  phoneNumber: string;
  endDate:Date;
};
type FetchingProp = {
  member: MemberProp[];
  loading:boolean,
  error:Error
};

import { NavLink } from "react-router-dom";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
import axiosFetch from "./AxiosFetch";

// const MembershipDashboard = ({ members }) => {
//   // Calculate totals
//   const totalMembers = members.length;
//   const expiredMembers = members.filter(m => dayjs(m.endDate).isBefore(dayjs())).length;
//   const activeMembers = totalMembers - expiredMembers;

//   return (
//     <div className="min-h-screen w-full bg-gray-50 p-8">
//       {/* Header */}
//       <header className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-800">Membership Dashboard</h1>
//         <p className="text-gray-600">Overview of all memberships</p>
//       </header>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
//         <div className="bg-white shadow rounded-lg p-6 text-center">
//           <h2 className="text-lg font-semibold text-gray-700">Total Members</h2>
//           <p className="text-2xl font-bold text-blue-600">{totalMembers}</p>
//         </div>
//         <div className="bg-white shadow rounded-lg p-6 text-center">
//           <h2 className="text-lg font-semibold text-gray-700">Active</h2>
//           <p className="text-2xl font-bold text-green-600">{activeMembers}</p>
//         </div>
//         <div className="bg-white shadow rounded-lg p-6 text-center">
//           <h2 className="text-lg font-semibold text-gray-700">Expired</h2>
//           <p className="text-2xl font-bold text-red-600">{expiredMembers}</p>
//         </div>
//       </div>

//       {/* Member List */}
//       <div className="bg-white shadow rounded-lg p-6">
//         <h2 className="text-xl font-semibold text-gray-800 mb-4">All Members</h2>
//         <ul className="divide-y divide-gray-200">
//           {members.map((member, index) => (
//             <li key={index} className="py-3 flex justify-between items-center">
//               <span className="text-gray-700 font-medium">{member.name}</span>
//               <span
//                 className={`text-sm font-semibold ${
//                   dayjs(member.endDate).isBefore(dayjs())
//                     ? "text-red-500"
//                     : "text-green-500"
//                 }`}
//               >
//                 {dayjs(member.endDate).isBefore(dayjs()) ? "Expired" : "Active"}
//               </span>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default MembershipDashboard;


const MembershipDashboard = () => {
  // const totalMembers = members.length;
  // const expiredMembers = members.filter(m => dayjs(m.endDate).isBefore(dayjs())).length;
  // const activeMembers = totalMembers - expiredMembers;
  const {data,isLoading,error }= useQuery<FetchingProp>({
    queryKey:['allmemberget'],
    queryFn:()=>axiosFetch("/user/member")
  })
  // if (isLoading) {
  //   return (
  //     <div className="w-full h-screen flex justify-center items-center">
  //       <div className="w-12 h-12 rounded-full border-4 border-t-gray-600 border-gray-200 animate-spin"></div>
  //     </div>
  //   );
  // }
  console.log("expireserror" , data,error)
  // if (error) {
  //   return (
  //     <div className="w-full h-screen flex justify-center items-center">
  //       <div>someting wrong</div>
  //     </div>
  //   );
  // }
  return (
    <div className="min-h-screen w-full bg-gray-100 p-8">
      {/* Page Header */}
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-80 pb-4">
           <header className="mb-6 ">
        <h1 className="text-4xl font-bold text-gray-800">Membership Dashboard</h1>
        <p className="text-gray-600 mt-2">All members and their status</p>

      </header>
        <SummaryCard title="Total Members" value={data?.member.length} color="blue" />
        </div>

      

      {/* Member List FIRST */}
      <section className="bg-white shadow rounded-lg p-6 mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Members</h2>
        <ul className="divide-y divide-gray-200">
          {data?.member.map((member) => (
            <li key={member._id} className="py-3 flex justify-between items-center">
              <span className="text-gray-700 font-medium">{member.name}</span>
              <span
                className={`text-sm font-semibold ${
                  dayjs(member.endDate).isBefore(dayjs())
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
               Mo.NO. {dayjs(member.endDate).isBefore(dayjs()) ? "Expired" : `${member.phoneNumber}`}
              </span>
             
            </li>
          ))}
        </ul>
      </section>

      {/* Summary Section BELOW */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard title="Total Members" value={data?.member.length} color="blue" />
        <SummaryCard title="Active Members" value={12} color="green" />
        <SummaryCard title="Expired Members" value={9} color="red" />
      </section>
      <div className="fixed  bottom-10 right-12 rounded-lg bg-yellow-400 py-4 px-4">
        <NavLink to="/members/create-member">+ Add Member</NavLink>
      </div>
    </div>
  );
};

// Reusable summary card
 const colorMap = {
    blue: "text-blue-600",
    green: "text-green-600",
    red: "text-red-600",
  } as const;
  type Color = keyof typeof colorMap
type SummaryCardProp={
  title:string,
  value:number | undefined,
  color:Color
}
const SummaryCard = ({ title, value, color }:SummaryCardProp) => {

  return (
    <div className="bg-white shadow rounded-lg p-6 text-center">
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
     
      <p className={`text-3xl font-bold ${colorMap[color]}`}>{value}</p>
    </div>
  );
};

export default MembershipDashboard;

// const MembershipDashboard = ({ members }) => {
//   const totalMembers = members.length;
//   const expiredMembers = members.filter(m => dayjs(m.endDate).isBefore(dayjs())).length;
//   const activeMembers = totalMembers - expiredMembers;

//   return (
//     <div className="min-h-screen w-full bg-gray-100 p-8">
//       {/* Page Header */}
//       <header className="mb-10">
//         <h1 className="text-4xl font-bold text-gray-800">Membership Dashboard</h1>
//         <p className="text-gray-600 mt-2">Track members, status, and expirations</p>
//       </header>

//       {/* Summary Section */}
//       <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
//         <SummaryCard title="Total Members" value={totalMembers} color="blue" />
//         <SummaryCard title="Active Members" value={activeMembers} color="green" />
//         <SummaryCard title="Expired Members" value={expiredMembers} color="red" />
//       </section>

//       {/* Member List */}
//       <section className="bg-white shadow rounded-lg p-6">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">All Members</h2>
//         <ul className="divide-y divide-gray-200">
//           {members.map((member, index) => (
//             <li key={index} className="py-3 flex justify-between items-center">
//               <span className="text-gray-700 font-medium">{member.name}</span>
//               <span
//                 className={`text-sm font-semibold ${
//                   dayjs(member.endDate).isBefore(dayjs())
//                     ? "text-red-500"
//                     : "text-green-500"
//                 }`}
//               >
//                 {dayjs(member.endDate).isBefore(dayjs()) ? "Expired" : "Active"}
//               </span>
//             </li>
//           ))}
//         </ul>
//       </section>
//     </div>
//   );
// };

// // Reusable summary card component
// const SummaryCard = ({ title, value, color }) => {
//   const colorMap = {
//     blue: "text-blue-600",
//     green: "text-green-600",
//     red: "text-red-600",
//   };
//   return (
//     <div className="bg-white shadow rounded-lg p-6 text-center">
//       <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
//       <p className={`text-3xl font-bold ${colorMap[color]}`}>{value}</p>
//     </div>
//   );
// };

// export default MembershipDashboard;
