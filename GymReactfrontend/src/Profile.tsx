import { useState } from "react";
import UseFetch from "./UseFetch";
import { NavLink } from "react-router-dom";
import { FaCamera, FaUser } from "react-icons/fa";
import UserPasswordUpdate from "./userPasswordUpdate";
import { useAuth } from "./AuthProvider";

type PostProp = {
  title: string;
  image: string;
  content: string;
  user: string;
};
type FetchingProp = {
  post: PostProp[];
};
const Profile = () => {
  const {user} = useAuth()
  console.log("user in profile", user)
  const { data } = UseFetch<FetchingProp>("/user/posts");
  const [im, setIm] = useState<string | null>(null);
  // const [posts, setPost] = useState<PostProp[]>([]);

  // if (loading) {
  //   return <div>loading posts</div>;
  // }
  // if (error) {
  //   return <div>{error.message}</div>;
  // }
  const handleProfileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const selectedimage = e.target.files[0];
    const imageurl = URL.createObjectURL(selectedimage);
    setIm(imageurl);
  };
  //   console.log("profile", data , posts)
  // setPost(p)
  return (
    // <div className="bg-yellow-100">
    //   <div className="">
    //     <div className="flex items-center m-4 gap-4">
    //       <div className="relative">
    //         <div className="flex   justify-center overflow-hidden text-gray-400 bg-black rounded-full w-20 h-20 overflow-hidden">
    //           {/* <FaUser size={90}/> */}
    //           {im ? (
    //             <img src={im} alt="" />
    //           ) : (
    //             <FaUser size={90} color="white" className="pt-2" />
    //           )}
    //         </div>
    //         <label
    //           htmlFor="profileinput"
    //           className=" cursor-pointer bg-green-400 "
    //         >
    //           <div className="absolute right-1 bottom-2 text-white">
    //             <input
    //               type="file"
    //               id="profileinput"
    //               accept="image/*"
    //               onChange={handleProfileImage}
    //               className="hidden"
    //             />

    //             <FaCamera color="white" />
    //           </div>
    //         </label>
    //       </div>
    //       <div>
    //         <h2>Name</h2>
    //         <p>Nickname</p>
    //         <p>lolalllalal</p>
    //       </div>
    //     </div>
    //     {/* <div className="px-4 py-2">
    //       <h1>Recents Posts</h1>
    //       <div className="flex space-x-4">
    //         <div className="w-80 h-80 bg-green-400">DIV 1</div>
    //         <div className="w-80 h-80 bg-blue-400">DIV 1</div>

    //         <div className="w-80 h-80 bg-red-400">DIV 1</div>

    //         <div className="w-80 h-80 bg-green-400">DIV 1</div>
    //         <div className="w-80 h-80 bg-red-400">DIV 1</div>
    //       </div>
    //     </div> */}
    //     <div className="px-8 mt-12">
    //       <h1 className="font-sm text-2xl">All posts</h1>
    //       <div className="flex">
    //         {data?.post.map((post, ind) => (
    //           <div key={ind} className="bg-blue-300 m-4 shadow-lg">
    //             <h1>{post.title}</h1>
    //             <div className="object-cover">
    //               <img
    //                 src={`http://localhost:5000/uploads/${post.image}`}
    //                 alt=""
    //               />
    //             </div>
    //             <p>{post.content}</p>
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   </div>
    //   <div className="bg-red-400 rounded-lg py-2 px-2">
    //     <NavLink to="/profile/logout" className="bg-red-400 rounded-lg py-2 px-2">Logout</NavLink>
    //   </div>
    //   <UserPasswordUpdate/>
    // </div>
    <div className="bg-yellow-100 p-6">
      <div className="flex items-center gap-6">
        <div className="relative">
          <div className="flex justify-center items-center bg-gray-800 rounded-full w-24 h-24 border-4 border-green-400 overflow-hidden">
            {im ? (
              <img
                src={im}
                alt="Profile"
                className="object-cover w-full h-full"
              />
            ) : (
              <FaUser size={60} color="white" />
            )}
          </div>
          <label
            htmlFor="profileinput"
            className="absolute right-0 bottom-0 bg-green-500 p-2 rounded-full cursor-pointer"
          >
            <FaCamera color="white" />
            <input
              type="file"
              id="profileinput"
              accept="image/*"
              onChange={handleProfileImage}
              className="hidden"
            />
          </label>
        </div>
        <div>
          {/* <h2 className="text-xl font-bold">{user}</h2> */}
          <p className="text-gray-600">Nickname</p>
        </div>
      </div>

      <div className="mt-12">
        <h1 className="text-2xl font-semibold">All Posts</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {data?.post.map((post, ind) => (
            <div
              key={ind}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
            >
              <img
                src={`http://localhost:5000/uploads/${post.image}`}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold">{post.title}</h2>
                <p className="text-gray-600">{post.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <NavLink
          to="/profile/logout"
          className="inline-block bg-red-500 text-white font-bold rounded-lg px-4 py-2 hover:bg-red-600 transition"
        >
          Logout
        </NavLink>
      </div>

      <UserPasswordUpdate />
    </div>
  );
};
export default Profile;

// function ProfilePage() {
//   const [profilePic, setProfilePic] = useState<string | ArrayBuffer | null>(
//     "https://i.pravatar.cc/150?img=5",
//   );
//   const user = {
//     name: "Shivam Kumar",
//     joinedDate: "2024-01-15",
//     currentPlan: "Premium Plan",
//     recentPlans: ["Basic Plan", "Standard Plan"],
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => setProfilePic(reader?.result);
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleLogout = () => {
//     alert("You have been logged out!");
//     // Add your logout logic here
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
//       {/* Profile Card */}
//       <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center">
//         {/* Profile Picture */}
//         <div className="relative inline-block">
//           <img
//             src={profilePic}
//             alt="Profile"
//             className="w-32 h-32 rounded-full border-4 border-indigo-500 mx-auto"
//           />
//           <label
//             htmlFor="profilePicUpload"
//             className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full cursor-pointer hover:bg-indigo-700 transition"
//           >
//             ✎
//           </label>
//           <input
//             id="profilePicUpload"
//             type="file"
//             accept="image/*"
//             className="hidden"
//             onChange={handleImageChange}
//           />
//         </div>

//         {/* Name */}
//         <h2 className="text-2xl font-bold mt-4">{user.name}</h2>
//         <p className="text-gray-500">
//           Joined on {new Date(user.joinedDate).toDateString()}
//         </p>

//         {/* Logout Button */}
//         <button
//           onClick={handleLogout}
//           className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
//         >
//           Logout
//         </button>

//         {/* Current Plan */}
//         <div className="mt-8 text-left">
//           <h3 className="text-lg font-semibold text-indigo-600">
//             Current Plan
//           </h3>
//           <p className="mt-2 bg-indigo-50 p-3 rounded-lg font-medium">
//             {user.currentPlan}
//           </p>
//         </div>

//         {/* Recent Plans */}
//         <div className="mt-6 text-left">
//           <h3 className="text-lg font-semibold text-gray-700">Recent Plans</h3>
//           {user.recentPlans.length > 0 ? (
//             <ul className="mt-2 space-y-2">
//               {user.recentPlans.map((plan, i) => (
//                 <li key={i} className="bg-gray-100 p-2 rounded-lg">
//                   {plan}
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-gray-500 mt-2">No recent plans</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
