import HomeMembershow from "./HomeMembershow";
import GymRecords from "./Recordes";
// import Auth from "./AuthProvider"
// type User = {
//   email: string;
// };
// type FetchingProp = {
//   ram: string;
//   user: User;
//   // loading:boolean,
//   // error:Error
// };
// const UserContent = () => {
//   const { user } = useAuth();

//   const [count, setCount] = useState(0);

//   const { loading, error, data } = UseFetch<FetchingProp>("/user/content");
//   // const adding = {
//   //   email:"e@gmail.com",
//   //   password:"1234e"
//   // }
//   // const res = await signup(adding)
//   if (loading) {
//     return <div>loading...</div>;
//   }
//   if (error) {
//     return <div>{error?.message}errrrrr</div>;
//   }
//   // console.log("con", typeof data?.user.email);
//   return (
//     <>
//     {user?.userName}
//       {/* <h1 className="bg-blue-900 ">Frontend</h1>

//       <h3 className="g-green-900">{data?.ram}</h3>
//       <div>
//         <h1>user</h1>
//         <h4 className="bg-gray-300">{user?.email}</h4>
//         <h2>user</h2>
//       </div>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p> */}
//       {/* <Member/>
//       <Member/> */}

//       {/* <SignUp/> */}
//     </>
//   );
// };
// export default UserContent;
type membera = {
  name: string;
};
export type mwp = {
  price: string;
  start_date: string;
  end_date: string;
  member: membera;
};
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useQuery } from "@tanstack/react-query";
import axiosFetch from "./AxiosFetch";
import { useAuth } from "./AuthProvider";
// import HomeMembershow from "./HomeMembershow";
type FetchProp = {
  mwp: mwp[];
};
export default function PaymentPage() {
  dayjs.extend(customParseFormat);
  const { user } = useAuth();
  const { data, isLoading} = useQuery<FetchProp>({
    queryKey: ["memberwithplan"],
    queryFn: () => axiosFetch("/user/memberwithplans"),
  });
  // const { loading, data, error } = UseFetch<mwpp>("/user/memberwithplans");
  console.log("loading tank", isLoading);
  // if (isLoading) {
  //   console.log("feching", isFetching);
  //   return <Pulse/>;
  // }
  // if (error) {
  //   console.log("error messsage", error.message);
  //   return (
  //     <div className="w-full h-screen flex justify-center items-center">
  //       something went wrong
  //     </div>
  //   );
  // }
  // const remaindays =
  const d = (s: string, e: string) => {
    const start = dayjs(s, "DD/MM/YYYY");
    const ends = dayjs(e, "DD/MM/YYYY");
    const remainsDay = ends.diff(start, "day");
    return remainsDay;
  };
  const r = d("30/03/2026", "30/04/2026");
  console.log("r", r);
  // const handleRecent = (member) => {
  //   setInputValue(member);
  //   // Add logic to fetch member/payment data
  // };
  // if (true) {
  //   return <div>
  //   <Loading />
  //   <Pulse/>
  //   <L/>

  //   </div>
  // }
  return (
    <div className="min-h-screen bg-gray-400 flex flex-col overflow-hidden">
      <div className={`bg-gray-400 `}>
        {/* <div>
          {isLoading && (
            <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
            // <div className="w-full h-60 bg-red-600 flex justify-center items-center">
            //   loading...
            // </div>
          )}
        </div> */}
        <GymRecords />
        {/* <HorizontalStepper/>  */}

        {user?.role==="admin" && (
          <div className="bg-gray-400 py-6 px-4">
            <div className="w-full py-4 px-4 font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-700  to-gray-100">
              Recent Membership owner
            </div>

            <div className="grid grid-rows-2 grid-flow-col gap-4 overflow-x-scroll  px-8 no-scrollbar">
              {data?.mwp.map(
                (m, i) => (
                  // const dd = d(m.start_date, m.end_date);

                  <div key={i} className="">
                    <HomeMembershow mm={m} />
                  </div>
                ),

              )}
            </div>
          </div>
        )}
      </div>
      {/* Header */}
      {/* <header className="w-full bg-white shadow px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">Payment Dashboard</h1>
        <nav className="space-x-4 text-sm text-gray-600">
          <a href="#" className="hover:text-blue-600">
            Home
          </a>
          <a href="#" className="hover:text-blue-600">
            Members
          </a>
          <a href="#" className="hover:text-blue-600">
            Payments
          </a>
        </nav>
      </header> */}

      {/* Main Content */}
      {/* <main className="flex-1 w-full px-6 py-8"> */}
      {/* Search Section */}
      {/* <div className="relative w-full mb-8">
          <input
            type="text"
            placeholder="Search member..."
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
          />
          {inputValue && (
            <button
              onClick={() => setInputValue("")}
              className="absolute right-4 top-3 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div> */}

      {/* Recent Members */}
      {/* {!inputValue && recentMembers.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">
              Recent Members
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recentMembers.map((member, ind) => (
                <div
                  key={ind}
                  onClick={() => handleRecent(member)}
                  className="cursor-pointer bg-white rounded-lg shadow px-4 py-3 hover:bg-blue-50 transition"
                >
                  {member}
                </div>
              ))}
            </div>
          </section>
        )} */}

      {/* Payment Section */}
      {/* {inputValue && (
          <section>
            <h2 className="text-lg font-semibold text-gray-700 mb-3">
              Payment Details for {inputValue}
            </h2>
            <div className="bg-white rounded-lg shadow p-6">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Amount
                  </label>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Payment Method
                  </label>
                  <select className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600">
                    <option>Credit Card</option>
                    <option>Debit Card</option>
                    <option>UPI</option>
                    <option>Net Banking</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white rounded-lg py-2 text-sm hover:bg-blue-700 transition"
                >
                  Make Payment
                </button>
              </form>
            </div>
          </section>
        )}
      </main> */}

      {/* Footer */}
      {/* <footer className="w-full bg-white shadow-inner px-6 py-4 text-center text-sm text-gray-400">
        © 2026 Payment Dashboard. All rights reserved.
      </footer> */}
    </div>
  );
}
