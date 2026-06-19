import type { mwp } from "./Home";
import { NavLink } from "react-router-dom";
import {type Dayjs} from "dayjs"
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { StarIcon, ChevronRight } from "lucide-react";
import { FaDumbbell, FaRupeeSign } from "react-icons/fa";
dayjs.extend(customParseFormat);
type mwm = {
  mm: mwp;
};
const diffrentDays = (s:Dayjs, e:string) => {
  // const current = dayjs(s, "DD/MM/YYYY");
  const ends = dayjs(e);
  const remainsDay = ends.diff(s, "day");
  return remainsDay;
};
const HomeMembershow = ({ mm }: mwm) => {

  const today = dayjs();
  console.log("typr of " , today ,typeof dayjs(), typeof mm.end_date)
  const remainingDays = diffrentDays(today, mm.end_date);
  // const l = dayjs(mm.end_date).format("DD/MM/YYYY")

  return (
    // <div className="shadow-lg bg-white py-4 w-80 rounded-lg px-4 ">
    //   <p>{mm.start_date}</p>
    //   <p>{mm.end_date}</p>
    //   <p>{addo}</p>
    //   <div className="flex pb-2">
    //     <h1 className=" flex-1 text-blue-900 font-semibold text-xl">
    //       {mm.member.name}
    //     </h1>
    //     <div className="flex-1 flex items-center justify-end px-4">
    //       {Number(mm.price) >= 8000 ? (
    //         <StarIcon fill="#fae20d" color="" />
    //       ) : (
    //         // <CheckCircle2Icon fill="green"/>
    //         <FaDumbbell fill="" size={22} />
    //       )}
    //     </div>
    //   </div>
    //   <div className="flex gap-2 pl-2 pb-2 items-end">
    //     <p className="text-sm">current plan</p>
    //     <div className="flex items-center">
    //       <FaRupeeSign />
    //       <p className="font-bold text-green-600">{mm.price} /-</p>
    //     </div>
    //   </div>
    //   <p>{mm.end_date}</p>
    //   <div className="flex justify-between pl-2 pr-4">
    //     <h1>{remainingDays} days left</h1>

    //     <div
    //       // onClick={() => navigate(`/home/membership/${name}`)}
    //       className="flex text-center  text-blue-800 text-sm"
    //     >
    //      <NavLink to={`/home/membership/${name}`}>view membership</NavLink> 
    //       <ChevronRight size={20} className="" />{" "}
    //     </div>
    //   </div>
    
    // </div>
    <div className="shadow-lg bg-white rounded-lg p-6 w-80">
  <div className="flex justify-between items-center mb-2">
    <h1 className="text-xl font-semibold text-blue-900">{mm.member.name}</h1>
    {Number(mm.price) >= 8000 ? (
      <StarIcon className="text-yellow-400" />
    ) : (
      <FaDumbbell className="text-gray-600" size={22} />
    )}
  </div>

  <p className="text-sm text-gray-500">
    {dayjs(mm.start_date).format("DD MMM YYYY")} → {dayjs(mm.end_date).format("DD MMM YYYY")}
  </p>

  <div className="flex items-center gap-2 mt-3">
    <FaRupeeSign className="text-green-600" />
    <p className="font-bold text-green-600 text-lg">
      {new Intl.NumberFormat("en-IN").format(Number(mm.price))}
    </p>
  </div>

  <div className="flex justify-between items-center mt-4">
    <span className="text-sm text-gray-700">{remainingDays} days left</span>
    <NavLink
      to={`/home/membership/${mm.member.name}`}
      className="flex items-center text-blue-600 font-medium hover:underline"
    >
      View Membership <ChevronRight size={18} />
    </NavLink>
  </div>
</div>

  );
};

export default HomeMembershow;
