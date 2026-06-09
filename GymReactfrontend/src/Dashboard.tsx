// import { useState } from "react";
// import { FaUser } from "react-icons/fa";
// import { Menu, X } from "lucide-react";
// import { NavLink, Outlet } from "react-router-dom";
// const Dashboard = () => {
//   // const navigate = useNavigate();
//   // navigate("/d/home");
//   const [open, setOpen] = useState(false);
//   return (
//     <div
//       className="flex flex-col md:flex-row  w-full h-screen"
//       onClick={() => {
//         if (open) {
//           setOpen(false);
//         }
//       }}
//     >
//       <div className="md:hidden">
//         <div className="flex justify-between items-center p-2">
//           <div className="flex">
//             <button onClick={() => setOpen(!open)}>
//               {open ? <X /> : <Menu />}
//             </button>
//             <h1 className="ml-4">🦢 duopo</h1>
//           </div>
//           <div className="">
//             <NavLink to="/login">Login</NavLink>
//           </div>
//         </div>
//         <div
//           className={`w-20% z-10 absolute h-screen bg-blue-100 transition-transform duration-400 ${open ? "translate-x-0" : "-translate-x-full"}`}
//         >
//           <nav className="">
//             <NavLink
//               to="/home"
//               className={({ isActive }) =>
//                 isActive
//                   ? "bg-gray-400 font-bold block px-6 py-4 rounded-lg"
//                   : "hover:bg-gray-200 font-bold block px-6 py-4 rounded-lg "
//               }
//             >
//               Home
//             </NavLink>
//             <NavLink
//               to="/members"
//               className={({ isActive }) =>
//                 isActive
//                   ? "bg-gray-400 font-bold block px-6 py-4 rounded-lg"
//                   : "hover:bg-gray-200 font-bold block px-6 py-4 rounded-lg "
//               }
//             >
//               Members
//             </NavLink>
//             <NavLink
//               to="/plans"
//               className={({ isActive }) =>
//                 isActive
//                   ? "bg-gray-400 font-bold block px-6 py-4 rounded-lg"
//                   : "hover:bg-gray-200 font-bold block px-6 py-4 rounded-lg "
//               }
//             >
//               Plans
//             </NavLink>
//             <NavLink
//               to="/payments"
//               className={({ isActive }) =>
//                 isActive
//                   ? "bg-gray-400 font-bold block px-6 py-4 rounded-lg"
//                   : "hover:bg-gray-200 font-bold block px-6 py-4 rounded-lg "
//               }
//             >
//               Payments
//             </NavLink>
//             <NavLink
//               to="/Expiries"
//               className={({ isActive }) =>
//                 isActive
//                   ? "bg-gray-400 font-bold block px-6 py-4 rounded-lg"
//                   : "hover:bg-gray-200 font-bold block px-6 py-4 rounded-lg "
//               }
//             >
//               Expiry
//             </NavLink>
//             <NavLink
//               to="/profile"
//               className={({ isActive }) =>
//                 isActive
//                   ? "bg-gray-400 font-bold block px-6 py-4 rounded-lg"
//                   : "hover:bg-gray-200 font-bold block px-6 py-4 rounded-lg "
//               }
//             >
//               <FaUser />
//             </NavLink>
//           </nav>
//         </div>
//       </div>
//       <div className="hidden md:block bg-blue-100  w-20%  h-screen ">
//         {/* <div className="fixed top-0 left-0"> */}
//         <div className="w-full font-bold text-sm px-4 py-4">🦢 duopo</div>
//         <br />
//         <nav className="">
//           <NavLink
//             to="/home"
//             className={({ isActive }) =>
//               isActive
//                 ? "bg-gray-400 font-bold block px-6 py-4 rounded-lg"
//                 : "hover:bg-gray-200 font-bold block px-6 py-4 rounded-lg "
//             }
//           >
//             Home
//           </NavLink>
//           <NavLink
//             to="/members"
//             className={({ isActive }) =>
//               isActive
//                 ? "bg-gray-400 font-bold block px-6 py-4 rounded-lg"
//                 : "hover:bg-gray-200 font-bold block px-6 py-4 rounded-lg "
//             }
//           >
//             Members
//           </NavLink>
//           <NavLink
//             to="/plans"
//             className={({ isActive }) =>
//               isActive
//                 ? "bg-gray-400 font-bold block px-6 py-4 rounded-lg"
//                 : "hover:bg-gray-200 font-bold block px-6 py-4 rounded-lg "
//             }
//           >
//             Plans
//           </NavLink>
//           <NavLink
//             to="/payments"
//             className={({ isActive }) =>
//               isActive
//                 ? "bg-gray-400 font-bold block px-6 py-4 rounded-lg"
//                 : "hover:bg-gray-200 font-bold block px-6 py-4 rounded-lg "
//             }
//           >
//             Payments
//           </NavLink>
//           <NavLink
//             to="/Expiries"
//             className={({ isActive }) =>
//               isActive
//                 ? "bg-gray-400 font-bold block px-6 py-4 rounded-lg"
//                 : "hover:bg-gray-200 font-bold block px-6 py-4 rounded-lg "
//             }
//           >
//             Expiry
//           </NavLink>
//           <NavLink
//             to="/profile"
//             className={({ isActive }) =>
//               isActive
//                 ? "bg-gray-400 font-bold block px-6 py-4 rounded-lg"
//                 : "hover:bg-gray-200 font-bold block px-6 py-4 rounded-lg "
//             }
//           >
//             <FaUser />
//           </NavLink>
//         </nav>
//         {/* </div> */}
//       </div>
//       <div className="flex-1 overflow-y-auto h-screen no-scrollbar">
//         {/* <div className="w-full bg-purple-300">lala</div> */}
//         <Outlet />
//       </div>
//     </div>
//   );
// };
// export default Dashboard;

// ...........
import { useState } from "react";
import { FaUser, FaHome, FaUsers, FaCreditCard } from "react-icons/fa";
import { Menu, X } from "lucide-react";
import { NavLink, Outlet, Link } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { FaColonSign } from "react-icons/fa6";

const UserLinks = ({ onLinkClick }: { onLinkClick: () => void }) => {
  return (
    <div>
      <NavLink
        onClick={onLinkClick}
        to="/payments"
        className={({ isActive }) =>
          isActive
            ? "flex-items-center px-6 py-4 border-l-4 border-blue-500 bg-gray-200 font-bold transition"
            : "flex items-center hover:bg-gray-100 px-4 py-6 transition"
        }
      >
        Payments
      </NavLink>
    </div>
  );
};

const SidebarNav = ({ onLinkClick }: { onLinkClick: () => void }) => {
  const { user } = useAuth();
  return (
    <nav className="space-y-2">
      <NavLink
        to="/"
        onClick={onLinkClick}
        className={({ isActive }) =>
          isActive
            ? "flex items-center gap-2 border-l-4 border-blue-500 bg-gray-200 font-bold px-6 py-4 transition"
            : "flex items-center gap-2 hover:bg-gray-100 px-6 py-4 transition"
        }
      >
        <FaHome /> Home
      </NavLink>

      <NavLink
        to="/plans"
        onClick={onLinkClick}
        className={({ isActive }) =>
          isActive
            ? "flex items-center gap-2 border-l-4 border-blue-500 bg-gray-200 font-bold px-6 py-4 transition"
            : "flex items-center gap-2 hover:bg-gray-100 px-6 py-4 transition"
        }
      >
        <FaCreditCard /> Plans
      </NavLink>
      {user && <UserLinks onLinkClick={onLinkClick} />}
      {user && user.role === "admin" && (
        <AdminLinks onLinkClick={onLinkClick} />
      )}
      {user ? (
        <NavLink
          onClick={onLinkClick}
          to="/profile"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-2 border-l-4 border-blue-500 bg-gray-200 font-bold px-6 py-4 transition"
              : "flex items-center gap-2 hover:bg-gray-100 px-6 py-4 transition"
          }
        >
          <FaUser /> Profiles
        </NavLink>
      ) : (
        <NavLink
          to="/login"
          onClick={onLinkClick}
          className={({ isActive }) =>
            isActive
              ? " flex items-center gap-2 border-l-4 border-blue-500 bg-gray-200 font-bold px-6 py-4 transition"
              : " flex items-center gap-2 hover:bg-gray-100 px-6 py-4 transition"
          }
        >
          <FaCreditCard /> Login
        </NavLink>
      )}
      <NavLink
        to="https://www.youtube.com"
        onClick={onLinkClick}
        className={({ isActive }) =>
          isActive
            ? " flex items-center gap-2 border-l-4 border-blue-500 bg-gray-200 font-bold px-6 py-4 transition"
            : "flex items-center gap-2 hover:bg-gray-100 px-6 py-4 transition"
        }
      >
        terms & seurity
      </NavLink>
      <Link to="www.youtube.com">terms</Link>
      <a href="www.youtube.com">go to </a>
    </nav>
  );
};
const Dashboard = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen">
      {/* Mobile Header */}
      <div className="md:hidden ">
        <div className="flex justify-between items-center p-2">
          <div className="flex">
            <button onClick={() => setOpen(!open)} aria-label="Toggle Menu">
              {open ? <X /> : <Menu />}
            </button>
            <h1 className="ml-4 font-bold">🦢 duopo</h1>
          </div>
          {user ? (
            <NavLink
              to="profile"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "flex items-center rounded-full  text-gray-600 border-blue-400 border-2 "
                  : " bg-gray-50 rounded-full border-black "
              }
            >
              <div className="border-2 border-black rounded-full p-1">
                <FaUser />
              </div>
            </NavLink>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
        </div>

        {/* Mobile Sidebar */}
        <div
          className={`w-[70%] z-10 absolute h-full bg-blue-100 transform transition-transform duration-300 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <SidebarNav onLinkClick={() => setOpen(false)} />
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block bg-blue-100 w-[15%] h-screen">
        <div className="w-full font-bold text-sm px-4 py-4">🦢 duopo</div>
        <SidebarNav onLinkClick={() => setOpen(false)} />
      </div>

      {/* Main Content */}
      <div
        className="flex-1 overflow-y-auto h-screen no-scrollbar"
        onClick={() => setOpen(false)}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;

const AdminLinks = ({ onLinkClick }: { onLinkClick: () => void }) => {
  return (
    <div>
      <NavLink
        to="/members"
        onClick={onLinkClick}
        className={({ isActive }) =>
          isActive
            ? "flex items-center gap-2 border-l-4 border-blue-500 bg-gray-200 font-bold px-6 py-4 transition"
            : "flex items-center gap-2 hover:bg-gray-100 px-6 py-4 transition"
        }
      >
        <FaUsers /> Members
      </NavLink>
      <NavLink
        onClick={onLinkClick}
        to="/payments"
        className={({ isActive }) =>
          isActive
            ? "flex-items-center px-6 py-4 border-l-4 border-blue-500 bg-gray-200 font-bold transition"
            : "flex items-center hover:bg-gray-100 px-4 py-6 transition"
        }
      >
        Payments
      </NavLink>
      <NavLink
        onClick={onLinkClick}
        to="/expiries"
        className={({ isActive }) =>
          isActive
            ? "flex-items-center px-6 py-4 border-l-4 border-blue-500 bg-gray-200 font-bold transition"
            : "flex items-center hover:bg-gray-100 px-4 py-6 transition"
        }
      >
        Expires
      </NavLink>
    </div>
  );
};
