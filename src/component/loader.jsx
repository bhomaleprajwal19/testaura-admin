import Sidebar from "./sidebar";
const Loader = ({ loading }) => {
  if (!loading) return null; 

  return (
    <div className="w-screen h-screen flex  ">
       <div className="h-full flex-shrink-0">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center">
      <div className="w-16  h-16 border-4 border-dashed rounded-full animate-spin border-[#7816f7] mb-4"></div>
      <p className="text-lg font-semibold text-[#7816f7] animate-pulse">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
