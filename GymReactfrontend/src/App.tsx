import LoginForm from "./loginForm";
import SignUpForm from "./CreateAccount/SignupForm";
import "./App.css";
import Home from "./1.HomeComponents/Home";
import { Route, Routes } from "react-router-dom";
import Member from "./Member";
import Plans from "./Plans";
import TermsAndConditions from "./TermsAndConditions";
import PaymentStatusPage from "./PaymentComponent/PaymentStatus";
import { Subscription } from "./PaymentComponent/Subscription";
import {
  MemberPage,
  PaymentPage,
  PlanPage,
  SelectedPlans,
} from "./PaymentComponent/payment";
import Expiry from "./Expiry";
import Logout from "./Logout";
import Verifycode from "./Verifycode";
// import { useAuth } from "./AuthProvider";
import ProtectedRoute from "./Meddlewere.For.Routes/ProtectedRoute";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import Createposts from "./Createposts";
// import Chat from "./chat";
import Apploading from "./Apploading";
import { useEffect, useState } from "react";
import AddMember from "./AddMember";
import { ToastContainer } from "react-toastify";
import HomeMemberMemberShipshow from "./HomeMemberMemberShipshow";
import ForgotePassword from "./ForgotePassword";
// import NetworkStatus from "./NetworkStatus";
import VerifyCodeForSignUp from "./CreateAccount/VerifyCodeForSignUp";
import LoginRoutes from "./Meddlewere.For.Routes/LoginRoutes";
import SomeThingWrongPage from "./someThingWrongPage";
function App() {
  const [appReady, setAppReady] = useState(false);
  // const isOnLine = NetworkStatus();
  // const navigate = useNavigate();
  // navigate("/home")
  // const token = localStorage.getItem("token");
  // const token = localStorage.removeItem("token");
  // console.log("Apptoken", token);
  // console.log(localStorage);
  useEffect(() => {
    setTimeout(() => setAppReady(true), 800);
  });
  if (!appReady) {
    return <Apploading />;
  }
  // if (isOnLine) {
  //   return <Logout />;
  // }
  // useEffect(() => {
  // if (!user) {
  //   console.log("usertsx", loading, !loading, user, !user);
  //   // navigate("/login");
  //   return <Navigate to="/login" replace />;
  // }
  // }, []);
  // if (!user) {
  //   console.log("app user", user);
  //   navigate("/login");
  //   // <div className="text-center w-screen flex justify-center mt-4">
  //   //   <Routes>
  //   //     <Route path="/login" element={<LoginForm />}></Route>
  //   //   </Routes>
  //   // </div>}
  // }

  return (
    <div>
      {/* <div className=" h-screen"> */}
      <div>
        <ToastContainer position="top-right" />
        <Routes>
          <Route element={<LoginRoutes />}>
            <Route path="/forgetpassword" element={<ForgotePassword />}></Route>
            <Route
              path="/forgetpassword/verify-code/:code"
              element={<Verifycode />}
            ></Route>
            <Route path="/login" element={<LoginForm />}></Route>
            <Route path="/registration" element={<SignUpForm />}></Route>
            <Route path="/verifycode" element={<VerifyCodeForSignUp />}></Route>
          </Route>
          <Route path="/" element={<Dashboard />}>
            

            <Route path="/" element={<Home />}></Route>
            <Route path="/plans" element={<Plans />}></Route>
            {/* </div> */}
            <Route
              path="/terms-and-conditions"
              element={<TermsAndConditions />}
            ></Route>
            {/* <Route
              path="/s/:orderid/paymentprocessing"
              element={<Process />}
              ></Route> */}
            <Route element={<ProtectedRoute />}>
              <Route
                path="/selectedplans/:id"
                element={<SelectedPlans />}
              ></Route>
              <Route path="/s" element={<Subscription />}></Route>
              <Route
                path="/home/membership/:name"
                element={<HomeMemberMemberShipshow />}
              ></Route>
              <Route path="/payments" element={<MemberPage />}></Route>
              <Route
                path="/payment-status"
                element={<PaymentStatusPage />}
              ></Route>
              <Route path="/payment" element={<PaymentPage />}></Route>
              <Route path="/plan" element={<PlanPage />}></Route>

              <Route path="/expiries" element={<Expiry />}></Route>
              <Route path="/members" element={<Member />}></Route>
              <Route
                path="/members/create-member"
                element={<AddMember />}
              ></Route>
              <Route path="/profile/logout" element={<Logout />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
              <Route
                path="/cart"
                element={<SomeThingWrongPage func={() => {}} />}
              ></Route>
              {/* <Route path="/chats" element={<Chat />}></Route> */}

              <Route path="/createpost" element={<Createposts />}></Route>
            </Route>
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
