import  { useState } from "react";

export const Loading = () => {
  const items = Array.from({ length: 10 });
  const [count, st] = useState(12);
  return (
    <div className="w-full flex flex-direction-row flex-wrap justify-center items-center  min-h-screen flex-row gap-4">
      <div className="bg-gradient-to-r from-purple-300 via-gray-200 via-blue-200 to-pink-400 w-40 h-40 rounded-full ">
        {/* <div className="rounded-full w-20 h-20 border-8  border-gray-300 border-l-green-300 "></div> */}
      </div>
      {/* <div className="rounded-full w-20 h-20 border-8  border-gray-300 border-l-green-300 animate-spin"></div> */}
      <div className="bg-gradient-to-r from-pink-900 via-gray-900 to-blue-900 w-40 h-40 rounded-full animate-spin flex justify-center items-center">
        <div className="rounded-full w-36 h-36  bg-green-500  "></div>
      </div>
      {/* ll */}
      <div
        className="bg-gradient-to-r from-pink-600 via-gray-200 to-blue-400 w-36 h-36  relative rounded-full animate-spin  
"
      >
        <div
          className="animate-[spin_1s_linear_infinite_reverse] absolute top-1/2 left-1/2"
          // style={{ animation: "spin 1s linear infinety reverse" }}
        >
          {items.map((_, i) => {
            const angle = (360 / items.length) * i;
            console.log("loding i", i, angle);
            return (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 "
              >
                <div
                  className={`bg-transparent border-2 border-gray-200 w-4 h-8 rounded-lg `}
                  style={{ transform: `rotate(${angle}deg) translateY(-40px)` }}
                ></div>
              </div>
            );
          })}
        </div>
      </div>

      {/* lll */}
      <div
        className="w-36 h-36  relative rounded-full  
"
      >
        <div
          className="absolute top-1/2 left-1/2 "
          // style={{ animation: "spin 1s linear infinety reverse" }}
        >
          {items.map((_, i) => {
            const angle = (360 / items.length) * i;
            console.log("loding i", i, angle);
            return (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 "
              >
                <div
                  className={` border-2 border-gray-200 w-2 h-6 rounded-lg   `}
                  style={{ transform: `rotate(${angle}deg) translateY(-40px)` }}
                >
                  <div
                    className=" w-6 h-8 animate-float"
                    style={{ animationDelay: `${0.1 * i}s` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <button onClick={() => st(count * 2)}>click</button>
      <p>{count}</p>
      <div
        className="w-36 h-36  relative rounded-full  
"
      >
        <div
          className="absolute top-1/2 left-1/2 animate-[spin_3s_linear_infinite_revere]"
          // style={{ animation: "spin 1s linear infinety reverse" }}
        >
          {items.map((_, i) => {
            const angle = (360 / items.length) * i;
            console.log("loding i", i, angle);
            return (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 "
              >
                <div
                  className={`  w-2 h-4 overflow-hidden `}
                  style={{ transform: `rotate(${angle}deg) translateY(-40px)` }}
                >
                  <div
                    className=" w-80 h-80 bg-gradient-to-r from-gray-800 to-gray-300 animate-float"
                    style={{ animationDelay: `${0.1 * i}s` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-[40px] h-[40px] bg-black [clip-path:polygon(25%_0%,75%_0%,100%_100%,0%_100%)]"></div>
    </div>
  );
};

export const Pulse = () => {
  const item = [
    { id: 1, color: "blue" },
    { id: 1, color: "green" },
    { id: 1, color: "yellow" },
    { id: 1, color: "red" },
    { id: 1, color: "blue" },
    { id: 1, color: "green" },
    { id: 1, color: "yellow" },
    { id: 1, color: "red" },
    { id: 1, color: "blue" },
    { id: 1, color: "green" },
  ];
  return (
    <div className="w-full  ">
      <div className="absolute top-1/2 left-1/2 ">
        {item.map((_, i) => {
          const angle = (360 / item.length) * i;

          return (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 animate-pulse"
              style={{
                animationDelay: `${0.1 * i}s`,
              }}
            >
              <div
                className="w-2 h-4 overflow-hidden border-gray-200 border-2 "
                style={{ transform: `rotate(${angle}deg) translateY(-40px)` }}
              >
                <div
                  className="w-4 h-8 animate-ping "
                  style={{
                    animationDelay: `${0.1 * i}s`,
                    backgroundColor: "#c9c6f9",
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// export const L = () => {
//   const [closetindex, st] = useState(0);
//   const babuRef = useRef<HTMLDivElement>(null);
//   const childRef = useRef<(HTMLDivElement|null)[]>([]);

//   const i = [
//     { id: 1, color: "blue" },
//     { id: 2, color: "green" },
//     { id: 3, color: "gray" },
//     { id: 4, color: "red" },
//   ];

// const ITEM_WIDTH = 160
//   const disi = [...i, ...i, ...i];
//   useEffect(() => {
//     const c = babuRef.current;
//     if (!c) {
//       return;
//     }
//     console.log("rerender");
//     c.scrollLeft = i.length * ITEM_WIDTH;
//   }, []);
//   console.log("rerender");

//   const onScroll = () => {
  
//     let c = babuRef.current;
//     const scrooby = i.length * ITEM_WIDTH;
//     if (!c) {
//       return console.log("c nhi he");
//     }
//     const center = c?.getBoundingClientRect();

//     if (c.scrollLeft >= scrooby * 2) {
//       c.scrollLeft -= scrooby;
//     }
//     if (c.scrollLeft <= 0) {
//       c.scrollLeft += scrooby;
//     }
//     let closest = 0;
//     let counry = Infinity;
//     if (!childRef.current) {
//       return;
//     }
//     for (let index = 0; index < disi.length; index++) {
//       if(!childRef?.current[index]){
//         return
//       }
//       const child = childRef.current[index].getBoundingClientRect();
//       const childCenter = child?.left + child?.width / 2;
//       const parentCenter = center.left + center.width / 2;
//       const distance = Math.abs(parentCenter - childCenter);
 
//       if (distance < counry) {
//         counry = distance;
//         closest = index;
//       }
//     }

//     console.log("closestIndex =", closest);
//     if (closest !== closetindex) {
//       st(closest);
//     }
//   };


//   return (
//     <>
//       <div
//         onScroll={onScroll}
//         className="flex w-[480px] h-40 overflow-x-scroll no-scrollbar "
//         ref={babuRef}
//       >
//         {disi.map((it, ii) => {
//           // const ff = findIndex(ii);
//           return (
//             <div
//               key={ii}
//               ref={(el) => {childRef.current[ii] = el}}
//               className={`bg-${it.color}-400 w-40 h-40 ${closetindex % 4 === ii % 4 ? "scale-75" : "scale-50"} nowrap shrink-0 font-bold text-xl  text-center transition-transform duration-500`}
//             >
//               {it.color} {ii}
//             </div>
//           );
//         })}
//       </div>


//     </>
//   );
// };
