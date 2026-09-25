// import { useEffect, useState } from "react";
// import { api } from "./Api";
// import Chat from "./chat"
import { useAuth } from "./AuthProvider";
import { NavLink } from "react-router-dom";
// type Alluser = {
//   email: string;
//  name : string;
//   _id: string;
//   role: string;
// };

function Logout() {
  // const [alluser, setAlluser] = useState<Alluser[]>([]);
  // const { user } = useAuth();
  const { logout } = useAuth();
  // useEffect(() => {
  //   const fetchAllUser = async () => {
  //     try {
  //       const all = await api.get("/user/alluser", { withCredentials: true });
  //       setAlluser(all.data.allUser);
  //     } catch (err: any) {
  //       console.log("alluserError", err.response.data.code);
  //     }
  //   };
  //   fetchAllUser();
  // });
  // const deleteUser = async (id: string) => {
  //   // console.log("delete email", id);
  //   try {
  //     const delet = await api.delete(`/user/delete/${id}`, {
  //       withCredentials: true,
  //     });
  //     console.log("delte user try", delet.data.code, delet.data.deletedId);
  //   } catch (err: any) {
  //     console.log("delte error", err.message);
  //   }
  //   setAlluser((prev) => prev?.filter((user) => user._id !== id));
  // };
  const logoutBtn = async () => {
    // console.log("logout", user?._id, typeof user?._id, user?.email);
    const res = await logout();
    if (!res.success) {
      console.log("logout btn", res.success,res?.message);
      // return (
      //   <div className="bg-black text-red-400">Logout Successgully re </div>
      // );
    }
  };
  return (
    <div className="">
      <button onClick={logoutBtn} className="bg-gray-400 py-4 px-4">
        Logout
      </button>
      <div className="absolute right-16 bottom-20 bg-purple-400 py-4 px-2 rounded-lg hover:scale-105">
        <NavLink to="/createpost">Create New Post</NavLink>
      </div>
      {/* <h1>All users</h1>
      <div className="">
        {alluser?.map((all, ind) => (
          <li key={ind} className="flex items-center w-full bg-purple-400">
            <div className="py-2 ml-4">{ind + 1}.</div>
            <div className="flex items-center  pl-16 w-1/2  gap-4">
              <div className="py-2  pl-16 text-xl ">{all.name}</div>
              <div className="py-2 pt-4 px-4  rounded-lg text-blue-800">
                {all.role}
              </div>
            </div>
            <div className=" flex justify-center w-1/2 px-2 py-2">
              <button
                className="flex  py-2 px-2 rounded-lg bg-red-400"
                onClick={() => deleteUser(all._id)}
              >
                Delete
              </button>
            </div>
            <br />
          </li>
        ))}
      </div>
      <div>
    
      </div> */}
    </div>
  );
}
export default Logout;
