import Skeleton from "react-loading-skeleton";

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
    <div className="max-h-screen overflow-hidden p-1 md:p-4 bg-red-40">
      <div className="grid md:grid-cols-2 gap-6  ">
        <Skett />
        <Skett />
        <Skett />
        <Skett />
      </div>
    </div>
  );
};
export default Sket