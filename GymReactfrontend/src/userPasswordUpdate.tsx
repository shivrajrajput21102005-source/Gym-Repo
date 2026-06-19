import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { api } from "./Api";
import axiosFetch from "./AxiosFetch";
type CradiProp = {
  email: string;
  password: string;
  newPassword: string;
};
type User = {
  _id: string;
  email: string;
};
type fetchProp = {
  allUser: User[];
};
// export default function userPasswordUpdate() {
//   const deletebtn = (id: string) => {
//     delet.mutate(id);
//   };
//   const deletel = async (id: string) => {
//     try {
//       const res = await api.delete(`/user/delete/${id}`, {
//         withCredentials: true,
//       });
//       console.log(res.data.code);
//     } catch (err) {
//       throw new Error();
//     }
//   };
//   const delet = useMutation({
//     mutationFn: deletel,
//   });
//   const fetch = useQuery<fetchProp>({
//     queryKey: ["user"],
//     queryFn: () => axiosFetch("/user/alluser"),
//   });
//   const [form, setform] = useState({
//     email: "",
//     password: "",
//     newPassword: "",
//   });
//   const formData = (e: React.ChangeEvent) => {
//     e.preventDefault();
//     mutate(form);
//     setform({
//       email: "",
//       password: "",
//       newPassword: "",
//     });
//   };
//   const updatePass = async (cradi: CradiProp) => {
//     console.log("cradi", cradi);
//     try {
//       const res = await api.post("/updatepass", cradi, {
//         withCredentials: true,
//       });
//       console.log("updatepass", res.data);
//     } catch (err) {
//       console.log("updateError", err);
//       throw new Error("something went wrong");
//     }
//   };
//   const { mutate, isError, isSuccess } = useMutation({
//     mutationFn: updatePass,
//   });

//   return (
//     <div>
//       <form onSubmit={formData}>
//         <input
//           type="email"
//           placeholder="email"
//           name="email"
//           onChange={(e) =>
//             setform({ ...form, [e.target.name]: e.target.value })
//           }
//         />
//         <input
//           type="password"
//           placeholder="password"
//           name="password"
//           onChange={(e) =>
//             setform({ ...form, [e.target.name]: e.target.value })
//           }
//         />
//         <input
//           type="password"
//           placeholder="new password"
//           name="newPassword"
//           onChange={(e) =>
//             setform({ ...form, [e.target.name]: e.target.value })
//           }
//         />
//         <button type="submit">next</button>
//       </form>
//       <div className="w-120 h-80 bg-green-700">
//         {fetch.isLoading && <div>loading</div>}
//         {fetch.isError && <div>{fetch.isError}er</div>}
//         {fetch.data && (
//           <div>
//             {fetch.data.allUser.map((user) => (
//               <div key={user._id} className="text-white flex gap-8">
//                 {user._id}
//                 {user.email}

//                 <button
//                   onClick={() => deletebtn(user._id)}
//                   className="bg-red-400 py-4 px-2 rounded-lg"
//                 >
//                   {delet.isPending ? "deleteing...." : "delete user"}
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//       {isError && <div>{isError} errora</div>}
//       {isSuccess && <div>Success updares</div>}
//     </div>
//   );
// }
export default function UserPasswordUpdate() {
  const [form, setForm] = useState({ email: "", password: "", newPassword: "" });

  const updatePass = async (cradi: CradiProp) => {
    const res = await api.post("/updatepass", cradi, { withCredentials: true });
    return res.data;
  };

  const { mutate, isError, error, isSuccess } = useMutation({ mutationFn: updatePass });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(form);
    setForm({ email: "", password: "", newPassword: "" });
  };

  const deleteUser = async (id: string) => api.delete(`/user/delete/${id}`, { withCredentials: true });
  const delet = useMutation({ mutationFn: deleteUser });

  const fetch = useQuery<fetchProp>({ queryKey: ["user"], queryFn: () => axiosFetch("/user/alluser") });

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })} className="w-full border rounded px-3 py-2" />
        <input type="password" name="password" placeholder="Current Password" value={form.password} onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })} className="w-full border rounded px-3 py-2" />
        <input type="password" name="newPassword" placeholder="New Password" value={form.newPassword} onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })} className="w-full border rounded px-3 py-2" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Update Password</button>
      </form>

      {isSuccess && <div className="text-green-600 font-bold">Password updated successfully!</div>}
      {isError && <div className="text-red-600 font-bold">{(error as Error)?.message}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fetch.isLoading && <div>Loading users...</div>}
        {fetch.isError && <div className="text-red-600">{(fetch.error as Error)?.message}</div>}
        {fetch.data?.allUser.map((user) => (
          <div key={user._id} className="bg-gray-800 text-white p-4 rounded-lg shadow flex justify-between items-center">
            <div>
              <p className="font-bold">{user.email}</p>
              <p className="text-sm">{user._id}</p>
            </div>
            <button onClick={() => delet.mutate(user._id)} className="bg-red-500 px-3 py-2 rounded hover:bg-red-600">
              {delet.isPending ? "Deleting..." : "Delete"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
