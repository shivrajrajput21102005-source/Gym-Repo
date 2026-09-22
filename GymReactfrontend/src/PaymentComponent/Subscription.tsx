import { useMutation} from "@tanstack/react-query";
import { api } from "../Api";
import { useNavigate } from "react-router-dom";
import { Loader } from "../loading";
export const Subscription = () => {
  const navigate = useNavigate();
  const payment = async (price: number) => {
    console.log("1");
    const response = await api.post("/payment/subscription", { price });
    console.log("response ", response.data);
    console.log("2");

    const options = {
      key: "rzp_test_SY9KTUPucXwHLj",
      amount: response.data.order.amount,
      // amount:,
      order_id: response.data.order.Id,
      currency: "INR",
      name: "My App",
      description: "Test Payment",
      handler: async (response: any) => {
        console.log("3");

        const verifyres = await api.post("/payment/verify-order", response);
        // alert("Payment successfull");
        console.log("4");

        if (verifyres.data.status === "SUCCESS") {
          alert("Payment successfull");
          console.log("5");
        } else {
          alert("Payment failed xx");
        }
      },
    };
    console.log("6");
    navigate(`/s/:${response.data.order.id}/paymentprocessing`);

    const rzp = new window.Razorpay(options);
    console.log("7");

    rzp.open();
    console.log("open razorpay");
  };

  const mutation = useMutation({ mutationFn: payment });
  console.log(mutation.data);
  // if(!mutation.isError ){
  //   console.log("type of ")
  //   return <SomeThingWrongPage func={()=>{mutation.mutate(200)}}/>
  // }
  if (mutation.isPending) {
    return <Loader />;
  }
  return (
    <div className="relative bg-indigo-400 border-2 border-blue-300 p-4">
      <h1>200 price </h1>
      <button
        onClick={() => {
          mutation.mutate(200);
        }}
        className="bg-purple-300 rounded-lg"
      >
        pay
      </button>
      <button
        onClick={() => {
          console.log(
            "window href",
            (window.location.href = "http://localhost:1212/auth/google"),
          );
        }}
      >
        window href
      </button>
    </div>
  );
};

// export const Process = () => {
//   const { orderId } = useParams();
//   const navigate = useNavigate();

//   const getPaymentStatus = async () => {
//     console.log("aeait sob");
//     try {
//       const response = await api.get(
//         `/payment/paymentstatus?orderid:${orderId}`,
//       );
//       // if (response.data.status === "SUCCESS") {
//       //   navigate(`/payment-${orderId}/status/success`, { replace: true });
//       // } else if (response.data.status === "FAILED") {
//       //   navigate(`/payment-${orderId}/status/failed`, { replace: true });
//       // }
//     } catch (err: any) {
//       console.log("err on process", err.message);
//       // navigate(`/payment-${orderId}/status/failed`, { replace: true });
//     }
//   };
//   // const paymentStatus = useQuery({
//   //   queryKey: ["paymentStatus"],
//   //   queryFn: getPaymentStatus,
//   // });
//   // if (false){
//   //   paymentStatus.data;
//   //   getPaymentStatus()
//   // }
//   useEffect(() => {
//     if (!orderId) {
//       navigate("/s");
//     }
//   }, []);
//   return (
//     <div className="flex justify-center flex-col ">
//       <div className="border-blue-400  w-20 h-20 border-t-blue-900 rounded-full border-4 animate-spin"></div>

//       <span>processing...</span>
//       <button
//         className="p-4 border-4 border-blue-300"
//         onClick={() => navigate(-1)}
//       >
//         navigate
//       </button>
//     </div>
//   );
// };
