const SomeThingWrongPage = ({ func }: { func: () => void }) => {
  return (
    <div className="min-h-screen  gap-4 flex justify-center items-center flex-col bg-white ">
      <div>
        <p>something went wrong !</p>
        <div className="flex justify-center mt-1">
          <button
            onClick={() => {
              func();
            }}
            className="bg-blue-400 p-2 rounded-lg text-white shrink-0 focus:scale-95"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
};

export default SomeThingWrongPage;
