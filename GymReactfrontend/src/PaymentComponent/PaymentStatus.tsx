import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// interface PaymentResponse {
//   razorpay_payment_id?: string;
//   razorpay_order_id?: string;
//   razorpay_signature?: string;
//   status: "success" | "failure";
// }

// export default function PaymentStatusPage() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [paymentData, setPaymentData] = useState<PaymentResponse | null>(null);

//   useEffect(() => {
//     // Get payment response passed from PaymentPage
//     const response = location.state?.paymentResponse as PaymentResponse;
//     if (response) {
//       setPaymentData(response);
//     }
//   }, [location.state]);

//   const handleGoHome = () => {
//     navigate("/");
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h2>Payment Status</h2>
//       {paymentData ? (
//         paymentData.status === "success" ? (
//           <div>
//             <h3 style={{ color: "green" }}>✅ Payment Successful!</h3>
//             <p>Payment ID: {paymentData.razorpay_payment_id}</p>
//             <p>Order ID: {paymentData.razorpay_order_id}</p>
//             <button onClick={handleGoHome}>Go to Home</button>
//           </div>
//         ) : (
//           <div>
//             <h3 style={{ color: "red" }}>❌ Payment Failed!</h3>
//             <p>Please try again.</p>
//             <button onClick={handleGoHome}>Go to Home</button>
//           </div>
//         )
//       ) : (
//         <p>No payment data available.</p>
//       )}
//     </div>
//   );
// ;

// export default function PaymentProcessingPage() {
//   const [status, setStatus] = useState<"processing" | "aborted" | "success">("processing");
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Simulate payment process
//     const timer = setTimeout(() => {
//       // For demo: randomly abort or succeed
//       const isAborted = Math.random() < 0.3;
//       setStatus(isAborted ? "aborted" : "success");
//     }, 4000);

//     return () => clearTimeout(timer);
//   }, []);

//   const handleGoHome = () => {
//     navigate("/");
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
//       {status === "processing" && (
//         <div className="flex flex-col items-center">
//           {/* Loader Wheel */}
//           <div className="w-20 h-20 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-6"></div>
//           <h2 className="text-2xl font-bold text-gray-700">Processing Payment...</h2>
//           <p className="mt-2 text-gray-500 text-center max-w-md">
//             Please wait while we complete your transaction.
//           </p>

//           {/* Screen-specific guidance */}
//           <div className="mt-6 text-sm text-gray-600">
//             <p className="hidden md:block">⚠️ Don’t refresh the page on medium screens.</p>
//             <p className="block md:hidden">⚠️ Don’t hit back on small screens.</p>
//           </div>
//         </div>
//       )}

//       {status === "success" && (
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-green-600">✅ Payment Successful!</h2>
//           <p className="mt-2 text-gray-600">Thank you for your purchase.</p>
//           <button
//             onClick={handleGoHome}
//             className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
//           >
//             Go to Home
//           </button>
//         </div>
//       )}

//       {status === "aborted" && (
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-red-600">❌ Payment Aborted</h2>
//           <p className="mt-2 text-gray-600">Your transaction was not completed.</p>
//           <button
//             onClick={handleGoHome}
//             className="mt-6 px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
//           >
//             Return to Home
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

export default function PaymentProcessingPage() {
  const [status, setStatus] = useState<"processing" | "aborted" | "success">(
    "processing",
  );
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate payment process
    const timer = setTimeout(() => {
      const isAborted =false
      const newStatus = isAborted ? "aborted" : "success";
      setStatus(newStatus);

      // Play sound when payment succeeds
      if (newStatus === "success") {
        const audio = new Audio("/public/s.mp3"); // place file in public/sounds
        audio.play().catch(() => console.log("Sound playback blocked"));
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      {status === "processing" && (
        <div className="flex flex-col items-center">
          {/* Loader Wheel */}
          <div className="w-20 h-20 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-6"></div>
          <h2 className="text-2xl font-bold text-gray-700">
            Processing Payment...
          </h2>
          <p className="mt-2 text-gray-500 text-center max-w-md">
            Please wait while we complete your transaction.
          </p>

          {/* Screen-specific guidance */}
          <div className="mt-6 text-sm text-gray-600">
            <p className="hidden md:block">
              ⚠️ Don’t refresh the page on medium screens.
            </p>
            <p className="block md:hidden">
              ⚠️ Don’t hit back on small screens.
            </p>
          </div>
        </div>
      )}

      {status === "success" && (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-600">
            ✅ Payment Successful!
          </h2>
          <p className="mt-2 text-gray-600">Thank you for your purchase.</p>
          <button
            onClick={handleGoHome}
            className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Go to Home
          </button>
        </div>
      )}

      {status === "aborted" && (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">
            ❌ Payment Aborted
          </h2>
          <p className="mt-2 text-gray-600">
            Your transaction was not completed.
          </p>
          <button
            onClick={handleGoHome}
            className="mt-6 px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Return to Home
          </button>
        </div>
      )}
    </div>
  );
}
