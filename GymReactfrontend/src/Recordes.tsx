import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SomeThingWrongPage from "./someThingWrongPage";

import { useQuery } from "@tanstack/react-query";
import axiosFetch from "./AxiosFetch";

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


export default function GymRecords() {


  return (
    <div className=" bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100  p-4 md:p-6 min-h-screen">

      <h1 className="md:text-2xl font-extrabold text-center mb-2 md:mb-8 text-gray-800">
        🏋️ Gym Records Board
      </h1>
      <div className="flex flex-col md:flex-row gap-2 overflow-x-scroll no-scrollbar">

      <RecordesListBackend />

      </div>

    
    </div>
  );
}

const RecordesListBackend = () => {
  const { data, isLoading, error } = useQuery<FetchingRecordsProp>({
    queryKey: ["records"],
    queryFn: () => axiosFetch("/records"),
  });
  console.log("records", data?.records.deadlift);
  if (isLoading) {
    // return <div> Record backend loading</div>
    return (
      <div>
        
        <Sket />
        <Sket />
        <Sket />
        <Sket />

      </div>
    );
  }
  if (error) {
    return <SomeThingWrongPage func={() => axiosFetch("/records")} />;
  }

  return (
    <div className="bg-white shadow-xl rounded-xl md:p-6 p-2 transition-transform shrink-0">
      <h2 className="md:text-2xl text-xl font-semibold mb-4 text-indigo-700 flex items-center">
        Top Deadlifts
      </h2>
      <ul className="space-y-0 rounded-lg bg-indigo-50">
        {data?.records.deadlift.map((member, index) => (
          <li
            key={index}
            className="flex justify-between items-center  p-2  shadow-sm  transition"
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

// const Records=(d:Deadlift[])=>{



//   return (
//     <div className="bg-white shadow-xl rounded-xl md:p-6 p-2 transition-transform shrink-0">
//       <h2 className="md:text-2xl text-xl font-semibold mb-4 text-indigo-700 flex items-center">
//         Top Deadlifts
//       </h2>
//       <ul className="space-y-0 rounded-lg bg-indigo-50">
//         {d.map((member, index) => (
//           <li
//             key={index}
//             className="flex justify-between items-center  p-2  shadow-sm  transition"
//           >
//             <div>
//               <span className="font-bold text-gray-800">
//                 {index + 1}. {member.name}
//               </span>
//               <p className="text-sm text-gray-500">
//                 Record set on {new Date(member.date).toLocaleDateString()}
//               </p>
//             </div>
//             <span className="text-indigo-600 font-extrabold text-lg">
//               {member.weight}
//             </span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };
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

import { api } from "./Api";

type Product = {
  _id: string;
  name: string;
  category: string; // e.g. "Protein", "Creatine"
  price: number;
  image: string;
  description: string;
};

const fetchProducts = async (): Promise<Product[]> => {
  const { data } = await api.get("/products"); // backend endpoint
  console.log("daat aaci", data.product);
  return data.product;
};

export function GymProducts() {
  const { data, isLoading, isError, error } = useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center  text-gray-600">
        Loading products...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        {error.message}
      </div>
    );
  }
  if (data) {
    console.log("product data", data);
  }
  return (
    <div className="bg-gray-50 p-2 md:p-6">
      <h1 className="text-xl font-bold text-indigo-700 mb-4 text-center">
        Gym Products
      </h1>

      <div className="grid md:grid-cols-4 grid-cols-2 sm:grid-cols-3 gap-2 md:max-w-6xl mx-auto bg-red-400">
        {data?.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-36 object-cover"
            />
            <div className="p-2">
            
               <h2 className="md:text-lg text-x font-semibold text-gray-800 line-clamp-1">
                {product.name}
              </h2>
       
              <p className="text-sm text-gray-500 ">{product.category}</p>
              <p className="text-indigo-600 font-bold">₹{product.price}</p>
              <p className="text-gray-600 text-sm  line-clamp-1">
                {product.description}
              </p>
              <button className="mt-2 w-full py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700">
                Add to Cart 
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
